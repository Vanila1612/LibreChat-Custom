import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

const server = new McpServer({
  name: 'agent-ai-excel-be',
  version: '0.1.0',
});

const baseURL = normalizeBaseURL(process.env.AGENT_AI_EXCEL_BE_API_BASE);
const defaultTimeoutMs = Number(process.env.AGENT_AI_EXCEL_BE_TIMEOUT_MS || 180000);

function normalizeBaseURL(value) {
  const url = value || 'http://host.docker.internal:8000';

  try {
    return new URL(url.endsWith('/') ? url : `${url}/`);
  } catch {
    throw new Error(`AGENT_AI_EXCEL_BE_API_BASE is invalid: ${url}`);
  }
}

function buildURL(path, query) {
  const url = new URL(path.replace(/^\/+/, ''), baseURL);

  Object.entries(query || {}).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    url.searchParams.set(key, String(value));
  });

  return url;
}

async function requestJSON({ path, method = 'GET', query, body, timeoutMs }) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs || defaultTimeoutMs);

  try {
    const response = await fetch(buildURL(path, query), {
      method,
      headers: {
        Accept: 'application/json',
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    return {
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      data,
    };
  } finally {
    clearTimeout(timer);
  }
}

function toolText(payload) {
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(payload, null, 2),
      },
    ],
  };
}

server.tool(
  'aie_health',
  'Check Agent AI Excel Backend API health and readiness.',
  {},
  async () => {
    const [health, ready] = await Promise.all([
      requestJSON({ path: '/api/health', timeoutMs: 10000 }),
      requestJSON({ path: '/api/ready', timeoutMs: 10000 }),
    ]);

    return toolText({ health, ready });
  },
);

server.tool(
  'aie_search_agent',
  'Ask the Agent AI Excel Backend reasoning agent. Use this for analytical Vietnamese questions about relationships, duplicates, imported Excel data, and risk analysis. Do not use this for direct lookup of a person/company name, customer code, national ID, phone, email, or address; use aie_search_entities for those exact lookup requests.',
  {
    question: z.string(),
    session_id: z.string().default('librechat'),
    search_mode: z.enum(['fuzzy', 'exact']).default('fuzzy'),
    debug: z.boolean().default(false),
    model_name: z.string().optional(),
  },
  async ({ question, session_id, search_mode, debug, model_name }) => {
    const result = await requestJSON({
      path: '/api/ai/search',
      method: 'POST',
      body: {
        question,
        session_id,
        search_mode,
        debug,
        ...(model_name ? { model_name } : {}),
      },
    });

    return toolText(result);
  },
);

server.tool(
  'aie_search_entities',
  'Directly search raw backend entities by company name, person name, customer code, national ID, tax code, phone, email, or address. This returns search summaries only. For a complete JSON/profile with collateral, relationships, management, customers, products, and raw Excel fields, use aie_lookup_entity_full.',
  {
    q: z.string(),
    limit: z.number().int().min(1).max(100).default(20),
  },
  async ({ q, limit }) => {
    const result = await requestJSON({
      path: '/api/search/persons',
      query: { q, limit },
      timeoutMs: 30000,
    });

    return toolText(result);
  },
);

server.tool(
  'aie_lookup_entity_full',
  'Search an entity and return complete backend detail JSON for the best matching result. Use this when the user asks LibreChat to return/export JSON, full information, full profile, customer 360, collateral detail, relationships, management, products, or raw Excel fields for a company/person lookup.',
  {
    q: z.string(),
    limit: z.number().int().min(1).max(100).default(20),
    detail_limit: z.number().int().min(1).max(5).default(1),
  },
  async ({ q, limit, detail_limit }) => {
    const search = await requestJSON({
      path: '/api/search/persons',
      query: { q, limit },
      timeoutMs: 30000,
    });

    const results = Array.isArray(search.data?.results) ? search.data.results : [];
    const details = await Promise.all(
      results.slice(0, detail_limit).map(async (result) => {
        const entityID = result.entity_id || result.person_id;

        if (!entityID) {
          return {
            search_result: result,
            detail: {
              ok: false,
              status: 400,
              statusText: 'Missing entity_id/person_id in search result.',
              data: null,
            },
          };
        }

        return {
          search_result: result,
          detail: await requestJSON({
            path: `/api/search/persons/${encodeURIComponent(entityID)}/profile`,
            timeoutMs: 60000,
          }),
        };
      }),
    );

    return toolText({
      search,
      details,
      note: 'search contains summary results; details contains full backend profile/customer_360 JSON for the top matches.',
    });
  },
);

server.tool(
  'aie_search_persons',
  'Backward-compatible alias for aie_search_entities. Directly search raw backend entities by company/person name or identifier.',
  {
    q: z.string(),
    limit: z.number().int().min(1).max(100).default(20),
  },
  async ({ q, limit }) => {
    const result = await requestJSON({
      path: '/api/search/persons',
      query: { q, limit },
      timeoutMs: 30000,
    });

    return toolText(result);
  },
);

server.tool(
  'aie_resolve_person',
  'Resolve ambiguous person or company search results and return candidates for disambiguation.',
  {
    q: z.string(),
    limit: z.number().int().min(1).max(100).default(20),
  },
  async ({ q, limit }) => {
    const result = await requestJSON({
      path: '/api/search/persons/resolve',
      query: { q, limit },
      timeoutMs: 30000,
    });

    return toolText(result);
  },
);

server.tool(
  'aie_get_person_profile',
  'Get a person profile, contacts, addresses, transaction summary, source references, and related people by person_id.',
  {
    person_id: z.string(),
  },
  async ({ person_id }) => {
    const result = await requestJSON({
      path: `/api/search/persons/${encodeURIComponent(person_id)}/profile`,
      timeoutMs: 30000,
    });

    return toolText(result);
  },
);

server.tool(
  'aie_get_relationships',
  'Get extracted relationships, optionally filtered by person_id.',
  {
    person_id: z.string().optional(),
    limit: z.number().int().min(1).max(500).default(100),
  },
  async ({ person_id, limit }) => {
    const result = await requestJSON({
      path: '/api/search/relationships',
      query: { person_id, limit },
      timeoutMs: 30000,
    });

    return toolText(result);
  },
);

server.tool(
  'aie_risk_alerts',
  'Get risk alerts detected from imported person and relationship data.',
  {
    limit: z.number().int().min(1).max(500).default(100),
  },
  async ({ limit }) => {
    const result = await requestJSON({
      path: '/api/risk/alerts',
      query: { limit },
      timeoutMs: 30000,
    });

    return toolText(result);
  },
);

server.tool(
  'aie_get_session',
  'Get Agent AI Excel Backend agent memory messages for a session.',
  {
    session_id: z.string().default('librechat'),
  },
  async ({ session_id }) => {
    const result = await requestJSON({
      path: `/api/ai/sessions/${encodeURIComponent(session_id)}`,
      timeoutMs: 30000,
    });

    return toolText(result);
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
