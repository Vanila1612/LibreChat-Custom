const agentAiExcelPrompts = [
  {
    name: 'Tra cứu khách hàng theo mã khách hàng',
    command: 'customer-by-code',
    category: 'Định danh và tra cứu',
    oneliner: 'Tra cứu chính xác hồ sơ khách hàng theo mã khách hàng.',
    prompt:
      'Tra cứu chính xác khách hàng có mã {{ma_khach_hang}}. Trả về tên, loại thực thể, thông tin định danh, địa chỉ, liên hệ, các bảng nguồn và cảnh báo nếu một mã khách hàng gắn với nhiều định danh.',
  },
  {
    name: 'Tra cứu khách hàng theo CCCD hoặc CMND',
    command: 'customer-by-national-id',
    category: 'Định danh và tra cứu',
    oneliner: 'Tra cứu khách hàng bằng CCCD, CMND hoặc hộ chiếu.',
    prompt:
      'Tra cứu chính xác khách hàng có CCCD/CMND/hộ chiếu {{so_dinh_danh}}. Trả về mã khách hàng, tên, ngày sinh, địa chỉ, thông tin liên hệ và nguồn dữ liệu.',
  },
  {
    name: 'Tra cứu khách hàng theo số điện thoại',
    command: 'customer-by-phone',
    category: 'Định danh và tra cứu',
    oneliner: 'Tìm khách hàng và các hồ sơ dùng chung số điện thoại.',
    prompt:
      'Tìm tất cả khách hàng liên quan đến số điện thoại {{so_dien_thoai}}. Phân biệt kết quả theo mã khách hàng, CCCD và địa chỉ; cảnh báo nếu nhiều định danh dùng chung số điện thoại.',
  },
  {
    name: 'Tra cứu khách hàng theo địa chỉ',
    command: 'customer-by-address',
    category: 'Định danh và tra cứu',
    oneliner: 'Tìm các cá nhân và tổ chức liên quan đến một địa chỉ.',
    prompt:
      'Tìm các cá nhân và tổ chức liên quan đến địa chỉ {{dia_chi}}. Nhóm theo địa chỉ chuẩn hóa, liệt kê mã khách hàng, CCCD/MST và giải thích evidence dùng để ghép nối.',
  },
  {
    name: 'Phân giải khách hàng trùng tên',
    command: 'resolve-duplicate-name',
    category: 'Định danh và tra cứu',
    oneliner: 'Phân biệt các khách hàng có cùng tên.',
    prompt:
      'Phân giải các khách hàng có tên {{ho_ten}}. Lập bảng ứng viên gồm mã khách hàng, CCCD, ngày sinh, số điện thoại, địa chỉ và tổ chức liên quan. Không tự động gộp nếu chưa đủ evidence.',
  },
  {
    name: 'Hồ sơ Customer 360 theo tên',
    command: 'customer-360-by-name',
    category: 'Customer 360',
    oneliner: 'Tổng hợp toàn bộ hồ sơ khách hàng theo tên.',
    prompt:
      'Lập hồ sơ Customer 360 cho {{ten_khach_hang}}. Tổng hợp định danh, tiền gửi, khoản vay, bảo lãnh, tài sản bảo đảm, hồ sơ xử lý rủi ro, cán bộ phụ trách và các thực thể liên quan.',
  },
  {
    name: 'Hồ sơ Customer 360 theo mã khách hàng',
    command: 'customer-360-by-code',
    category: 'Customer 360',
    oneliner: 'Tổng hợp hồ sơ 360 theo mã khách hàng.',
    prompt:
      'Lập hồ sơ Customer 360 cho mã khách hàng {{ma_khach_hang}}. Trình bày tổng quan tài chính, các sản phẩm đang có, quan hệ nổi bật, risk indicators và nguồn dữ liệu.',
  },
  {
    name: 'Tóm tắt sản phẩm của khách hàng',
    command: 'customer-product-summary',
    category: 'Customer 360',
    oneliner: 'Tóm tắt các sản phẩm và hồ sơ liên quan của khách hàng.',
    prompt:
      'Tóm tắt các sản phẩm của khách hàng {{dinh_danh_khach_hang}} gồm tiền gửi, khoản vay, bảo lãnh và tài sản bảo đảm. Nêu số lượng hồ sơ, giá trị chính và trạng thái nếu có.',
  },
  {
    name: 'So sánh hai hồ sơ khách hàng',
    command: 'compare-two-customers',
    category: 'Customer 360',
    oneliner: 'So sánh hồ sơ 360 của hai khách hàng.',
    prompt:
      'So sánh hồ sơ Customer 360 của {{khach_hang_thu_nhat}} và {{khach_hang_thu_hai}}. Đối chiếu định danh, địa chỉ, liên hệ, sản phẩm, dư nợ, tài sản bảo đảm, rủi ro và quan hệ chung.',
  },
  {
    name: 'Truy vết nguồn hồ sơ khách hàng',
    command: 'customer-source-trace',
    category: 'Customer 360',
    oneliner: 'Truy vết hồ sơ khách hàng về file, sheet và dòng nguồn.',
    prompt:
      'Truy vết dữ liệu của khách hàng {{dinh_danh_khach_hang}} về các nguồn gốc. Liệt kê file nguồn, sheet TG/CD/CD21/CD22/DN/DNBL/TS/XLRR, dòng dữ liệu và evidence tương ứng.',
  },
  {
    name: 'Tìm người liên quan đến khách hàng',
    command: 'find-related-people',
    category: 'Quan hệ',
    oneliner: 'Tìm các cá nhân và tổ chức liên quan trong tối đa ba bước.',
    prompt:
      'Tìm các cá nhân và tổ chức liên quan đến {{dinh_danh_khach_hang}} trong tối đa {{do_sau:1|2|3}} bước. Sắp xếp theo độ mạnh quan hệ và nêu evidence cho từng quan hệ.',
  },
  {
    name: 'Giải thích quan hệ giữa hai khách hàng',
    command: 'explain-customer-relationship',
    category: 'Quan hệ',
    oneliner: 'Giải thích vì sao hai khách hàng được xác định là liên quan.',
    prompt:
      'Giải thích tại sao {{khach_hang_thu_nhat}} liên quan đến {{khach_hang_thu_hai}}. Liệt kê các đường liên kết, loại quan hệ, độ mạnh và nguồn evidence.',
  },
  {
    name: 'Tìm khách hàng dùng chung số điện thoại',
    command: 'shared-phone-customers',
    category: 'Quan hệ',
    oneliner: 'Phát hiện các khách hàng dùng chung số điện thoại.',
    prompt:
      'Tìm các khách hàng dùng chung số điện thoại {{so_dien_thoai}}. Phân biệt theo mã khách hàng và CCCD, sau đó đánh giá đây có thể là hộ gia đình, nhóm liên quan hay dấu hiệu cần kiểm tra.',
  },
  {
    name: 'Tìm khách hàng dùng chung địa chỉ',
    command: 'shared-address-customers',
    category: 'Quan hệ',
    oneliner: 'Phát hiện các khách hàng dùng chung địa chỉ.',
    prompt:
      'Tìm các khách hàng và tổ chức dùng chung địa chỉ {{dia_chi}}. Nhóm theo định danh, nêu quan hệ đã biết và đánh giá mức độ cần kiểm tra.',
  },
  {
    name: 'Tìm cổ đông và người đại diện công ty',
    command: 'company-owners-representatives',
    category: 'Quan hệ',
    oneliner: 'Tra cứu cổ đông, chủ sở hữu và người đại diện.',
    prompt:
      'Tìm cổ đông, chủ sở hữu vốn và người đại diện của công ty {{ten_hoac_ma_cong_ty}}. Nêu chức danh, tỷ lệ biểu quyết, định danh và nguồn từ CD/CD21/CD22.',
  },
  {
    name: 'Tra cứu tiền gửi của khách hàng',
    command: 'customer-deposits',
    category: 'Tiền gửi',
    oneliner: 'Tổng hợp tài khoản và số dư tiền gửi của khách hàng.',
    prompt:
      'Tra cứu tiền gửi của khách hàng {{dinh_danh_khach_hang}}. Liệt kê số tài khoản, sản phẩm, loại tiền, số dư hiện tại, lãi suất, ngày mở, ngày đáo hạn và trạng thái.',
  },
  {
    name: 'Tìm tài khoản tiền gửi theo số tài khoản',
    command: 'deposit-by-account',
    category: 'Tiền gửi',
    oneliner: 'Tra cứu chủ tài khoản và chi tiết tiền gửi.',
    prompt:
      'Tra cứu tài khoản tiền gửi {{so_tai_khoan}}. Trả về chủ tài khoản, mã khách hàng, số dư, sản phẩm, kỳ hạn, lãi suất, cán bộ phụ trách và nguồn TG.',
  },
  {
    name: 'Tìm tiền gửi sắp đáo hạn',
    command: 'deposits-near-maturity',
    category: 'Tiền gửi',
    oneliner: 'Tìm tiền gửi đáo hạn trong khoảng thời gian yêu cầu.',
    prompt:
      'Tìm các tài khoản tiền gửi của {{dinh_danh_khach_hang}} đáo hạn từ {{tu_ngay}} đến {{den_ngay}}. Nêu số dư, kỳ hạn, tự động tái tục và cán bộ phụ trách.',
  },
  {
    name: 'Kiểm tra lãi suất tiền gửi đặc biệt',
    command: 'special-deposit-rate',
    category: 'Tiền gửi',
    oneliner: 'Kiểm tra tài khoản có lãi suất đặc biệt.',
    prompt:
      'Kiểm tra các tài khoản tiền gửi của {{dinh_danh_khach_hang}} có lãi suất đặc biệt. So sánh RATE và SPECIAL_RATE, nêu kỳ áp dụng và nguồn dữ liệu.',
  },
  {
    name: 'Tổng hợp tiền gửi theo cán bộ phụ trách',
    command: 'deposits-by-officer',
    category: 'Tiền gửi',
    oneliner: 'Tổng hợp khách hàng tiền gửi do một cán bộ phụ trách.',
    prompt:
      'Tổng hợp các khách hàng và tài khoản tiền gửi do cán bộ {{ten_hoac_ma_can_bo}} phụ trách. Nêu số tài khoản, tổng số dư, sản phẩm, đơn vị và các trường hợp cần chú ý.',
  },
  {
    name: 'Tra cứu khoản vay của khách hàng',
    command: 'customer-loans',
    category: 'Tín dụng',
    oneliner: 'Tổng hợp khoản vay và dư nợ của khách hàng.',
    prompt:
      'Tra cứu các khoản vay của khách hàng {{dinh_danh_khach_hang}}. Liệt kê mã phê duyệt, mã giải ngân, số tiền được duyệt, giải ngân, dư nợ còn lại, ngày đáo hạn, mục đích vay và cán bộ tín dụng.',
  },
  {
    name: 'Tra cứu khoản vay theo mã phê duyệt',
    command: 'loan-by-approval',
    category: 'Tín dụng',
    oneliner: 'Tra cứu khoản vay theo mã hồ sơ phê duyệt.',
    prompt:
      'Tra cứu khoản vay có mã phê duyệt {{ma_phe_duyet}}. Trả về khách hàng, giải ngân, dư nợ, thời hạn, tài sản bảo đảm, cán bộ quản lý và nguồn DN.',
  },
  {
    name: 'Tra cứu khoản vay theo mã giải ngân',
    command: 'loan-by-disbursement',
    category: 'Tín dụng',
    oneliner: 'Tra cứu khoản vay theo mã giải ngân.',
    prompt:
      'Tra cứu khoản vay có mã giải ngân {{ma_giai_ngan}}. Nêu khách hàng, số tiền giải ngân, dư nợ, ngày giải ngân, ngày đáo hạn, mục đích và hồ sơ rủi ro liên quan.',
  },
  {
    name: 'Kiểm tra dư nợ lớn',
    command: 'large-outstanding-balance',
    category: 'Tín dụng',
    oneliner: 'Kiểm tra dư nợ vượt ngưỡng.',
    prompt:
      'Kiểm tra các khoản vay có dư nợ còn lại từ {{nguong_du_no}} {{loai_tien:VND|USD|EUR}} trở lên. Nhóm theo khách hàng và cán bộ tín dụng, nêu tài sản bảo đảm và hồ sơ rủi ro nếu có.',
  },
  {
    name: 'Kiểm tra khoản vay sắp đến hạn',
    command: 'loans-near-maturity',
    category: 'Tín dụng',
    oneliner: 'Tìm khoản vay sắp đến hạn trong khoảng thời gian.',
    prompt:
      'Tìm các khoản vay của {{dinh_danh_khach_hang}} có ngày đáo hạn từ {{tu_ngay}} đến {{den_ngay}}. Nêu dư nợ, lịch trả nợ tiếp theo, cán bộ tín dụng và tài sản bảo đảm.',
  },
  {
    name: 'Tra cứu bảo lãnh của khách hàng',
    command: 'customer-guarantees',
    category: 'Bảo lãnh',
    oneliner: 'Tổng hợp các hợp đồng bảo lãnh của khách hàng.',
    prompt:
      'Tra cứu các bảo lãnh của khách hàng {{dinh_danh_khach_hang}}. Liệt kê số hợp đồng, tài khoản, loại bảo lãnh, số tiền, loại tiền, ngày bắt đầu, ngày hết hiệu lực và hợp đồng liên quan.',
  },
  {
    name: 'Tra cứu bảo lãnh theo hợp đồng',
    command: 'guarantee-by-contract',
    category: 'Bảo lãnh',
    oneliner: 'Tra cứu bảo lãnh theo số hợp đồng.',
    prompt:
      'Tra cứu bảo lãnh có số hợp đồng {{so_hop_dong_bao_lanh}}. Trả về khách hàng, tài khoản, loại bảo lãnh, giá trị nguyên tệ, giá trị quy đổi VND, thời hạn và hợp đồng liên quan.',
  },
  {
    name: 'Tìm bảo lãnh sắp hết hiệu lực',
    command: 'guarantees-near-expiry',
    category: 'Bảo lãnh',
    oneliner: 'Tìm các bảo lãnh sắp hết hiệu lực.',
    prompt:
      'Tìm các bảo lãnh hết hiệu lực từ {{tu_ngay}} đến {{den_ngay}}. Nhóm theo khách hàng, nêu số hợp đồng, loại bảo lãnh, số tiền và hợp đồng liên quan.',
  },
  {
    name: 'Kiểm tra bảo lãnh giá trị lớn',
    command: 'large-guarantees',
    category: 'Bảo lãnh',
    oneliner: 'Tìm các bảo lãnh có giá trị vượt ngưỡng.',
    prompt:
      'Tìm các bảo lãnh có giá trị quy đổi VND từ {{nguong_gia_tri}} trở lên. Liệt kê khách hàng, hợp đồng, loại bảo lãnh, thời hạn và các khoản vay liên quan.',
  },
  {
    name: 'Đối chiếu bảo lãnh với hợp đồng liên quan',
    command: 'guarantee-related-contract',
    category: 'Bảo lãnh',
    oneliner: 'Đối chiếu bảo lãnh và hợp đồng liên quan.',
    prompt:
      'Đối chiếu bảo lãnh {{so_hop_dong_bao_lanh}} với hợp đồng liên quan. Nêu khách hàng, số tiền, thời hạn, tài khoản và các điểm không khớp hoặc thiếu evidence.',
  },
  {
    name: 'Tra cứu tài sản bảo đảm của khách hàng',
    command: 'customer-collaterals',
    category: 'Tài sản bảo đảm',
    oneliner: 'Tổng hợp tài sản bảo đảm của khách hàng.',
    prompt:
      'Tra cứu tài sản bảo đảm liên quan đến khách hàng {{dinh_danh_khach_hang}}. Phân biệt vai trò chủ sở hữu và người cầm cố/thế chấp; nêu loại tài sản, địa điểm, giá trị, giá trị khả dụng và khoản vay được bảo đảm.',
  },
  {
    name: 'Tra cứu tài sản bảo đảm theo mã',
    command: 'collateral-by-number',
    category: 'Tài sản bảo đảm',
    oneliner: 'Tra cứu chi tiết tài sản bảo đảm theo mã.',
    prompt:
      'Tra cứu tài sản bảo đảm có mã {{ma_tai_san_bao_dam}}. Trả về chủ sở hữu, người cầm cố/thế chấp, loại tài sản, vị trí, giá trị, hồ sơ phê duyệt, tài khoản và cán bộ xử lý.',
  },
  {
    name: 'Kiểm tra tài sản bảo đảm thấp hơn dư nợ',
    command: 'collateral-below-balance',
    category: 'Tài sản bảo đảm',
    oneliner: 'Phát hiện khoản vay có giá trị tài sản thấp hơn dư nợ.',
    prompt:
      'Kiểm tra khách hàng {{dinh_danh_khach_hang}} có khoản vay nào mà tổng giá trị tài sản bảo đảm thấp hơn dư nợ hiện tại. Tính chênh lệch, tỷ lệ bao phủ và nêu evidence.',
  },
  {
    name: 'Tìm tài sản bảo đảm dùng chung',
    command: 'shared-collateral',
    category: 'Tài sản bảo đảm',
    oneliner: 'Tìm tài sản bảo đảm liên quan nhiều khách hàng hoặc khoản vay.',
    prompt:
      'Tìm tài sản bảo đảm {{ma_tai_san_hoac_dia_diem}} đang liên quan đến nhiều khách hàng, người cầm cố hoặc khoản vay. Liệt kê các bên liên quan và evidence nối quan hệ.',
  },
  {
    name: 'Tài sản bảo đảm sắp hết hiệu lực',
    command: 'collateral-near-expiry',
    category: 'Tài sản bảo đảm',
    oneliner: 'Tìm tài sản bảo đảm có đăng ký sắp hết hiệu lực.',
    prompt:
      'Tìm tài sản bảo đảm có ngày hết hiệu lực từ {{tu_ngay}} đến {{den_ngay}}. Nêu mã tài sản, chủ sở hữu, người thế chấp, giá trị, khoản vay và cán bộ phụ trách.',
  },
  {
    name: 'Tra cứu hồ sơ xử lý rủi ro của khách hàng',
    command: 'customer-risk-records',
    category: 'Xử lý rủi ro',
    oneliner: 'Tổng hợp hồ sơ xử lý rủi ro của khách hàng.',
    prompt:
      'Tra cứu hồ sơ xử lý rủi ro của khách hàng {{dinh_danh_khach_hang}}. Liệt kê mã XLRR, hợp đồng, giải ngân, ngày xử lý, dư gốc, dư lãi, tổng tài sản và cán bộ tín dụng.',
  },
  {
    name: 'Tra cứu hồ sơ theo mã xử lý rủi ro',
    command: 'risk-by-code',
    category: 'Xử lý rủi ro',
    oneliner: 'Tra cứu chi tiết theo mã xử lý rủi ro.',
    prompt:
      'Tra cứu hồ sơ có mã xử lý rủi ro {{ma_xlrr}}. Trả về khách hàng, hợp đồng, giải ngân, mục đích vay, dư gốc, dư lãi, tài sản bảo đảm, địa bàn và cán bộ phụ trách.',
  },
  {
    name: 'Kiểm tra dư gốc xử lý rủi ro lớn',
    command: 'large-risk-principal',
    category: 'Xử lý rủi ro',
    oneliner: 'Tìm hồ sơ xử lý rủi ro có dư gốc vượt ngưỡng.',
    prompt:
      'Tìm các hồ sơ xử lý rủi ro có dư gốc hiện tại từ {{nguong_du_goc}} trở lên. Nhóm theo khách hàng và cán bộ tín dụng, nêu dư lãi, tổng tài sản và tỷ lệ bao phủ.',
  },
  {
    name: 'Kiểm tra rủi ro theo địa bàn',
    command: 'risk-by-location',
    category: 'Xử lý rủi ro',
    oneliner: 'Tổng hợp hồ sơ rủi ro theo tỉnh, huyện hoặc xã.',
    prompt:
      'Tổng hợp hồ sơ xử lý rủi ro tại {{dia_ban}}. Nêu số hồ sơ, tổng dư gốc, tổng dư lãi, tổng tài sản, khách hàng nổi bật và cán bộ phụ trách.',
  },
  {
    name: 'Kiểm tra thu hồi sau xử lý rủi ro',
    command: 'risk-recovery-progress',
    category: 'Xử lý rủi ro',
    oneliner: 'Đánh giá tiến độ thu hồi của hồ sơ xử lý rủi ro.',
    prompt:
      'Đánh giá tiến độ thu hồi của hồ sơ xử lý rủi ro {{ma_xlrr_hoac_khach_hang}}. So sánh dư đầu kỳ, thu gốc/lãi trong kỳ, dư cuối kỳ và tài sản bảo đảm.',
  },
  {
    name: 'Tổng hợp khách hàng do cán bộ quản lý',
    command: 'customers-by-officer',
    category: 'Cán bộ và vận hành',
    oneliner: 'Tổng hợp khách hàng và hồ sơ do cán bộ quản lý.',
    prompt:
      'Tổng hợp các khách hàng và hồ sơ do cán bộ {{ten_hoac_ma_can_bo}} quản lý. Phân nhóm tiền gửi, khoản vay, tài sản bảo đảm và xử lý rủi ro; nêu tổng giá trị và trường hợp nổi bật.',
  },
  {
    name: 'Kiểm tra cán bộ có nhiều hồ sơ rủi ro',
    command: 'officer-risk-concentration',
    category: 'Cán bộ và vận hành',
    oneliner: 'Phát hiện tập trung hồ sơ rủi ro theo cán bộ.',
    prompt:
      'Kiểm tra cán bộ có từ {{nguong_so_ho_so}} hồ sơ xử lý rủi ro trở lên. Xếp hạng theo số hồ sơ và tổng dư gốc, đồng thời nêu khách hàng và địa bàn liên quan.',
  },
  {
    name: 'Tra cứu user thao tác hồ sơ',
    command: 'records-by-system-user',
    category: 'Cán bộ và vận hành',
    oneliner: 'Tìm các hồ sơ do một user hệ thống thao tác.',
    prompt:
      'Tra cứu các hồ sơ do user hệ thống {{ten_hoac_id_user}} thao tác. Liệt kê khoản vay, tài sản bảo đảm, khách hàng liên quan và nguồn dữ liệu.',
  },
  {
    name: 'Kiểm tra cán bộ quản lý dư nợ lớn',
    command: 'officer-large-balance',
    category: 'Cán bộ và vận hành',
    oneliner: 'Tìm cán bộ quản lý tổng dư nợ vượt ngưỡng.',
    prompt:
      'Tìm cán bộ quản lý tổng dư nợ từ {{nguong_tong_du_no}} trở lên. Xếp hạng theo tổng dư nợ, số khách hàng, số khoản vay, tài sản bảo đảm và hồ sơ rủi ro.',
  },
  {
    name: 'Truy vết cán bộ liên quan khách hàng',
    command: 'customer-officer-trace',
    category: 'Cán bộ và vận hành',
    oneliner: 'Tìm toàn bộ cán bộ và user liên quan đến khách hàng.',
    prompt:
      'Truy vết toàn bộ cán bộ phụ trách, cán bộ tín dụng, nhân viên và user thao tác liên quan đến khách hàng {{dinh_danh_khach_hang}}. Nêu vai trò, hồ sơ liên quan và evidence.',
  },
  {
    name: 'Phát hiện một CCCD gắn nhiều tên',
    command: 'duplicate-national-id-alert',
    category: 'Kiểm tra dữ liệu và cảnh báo',
    oneliner: 'Phát hiện CCCD hoặc CMND gắn với nhiều tên.',
    prompt:
      'Kiểm tra CCCD/CMND {{so_dinh_danh}} có gắn với nhiều tên hoặc mã khách hàng không. Đánh giá mức độ nghiêm trọng, liệt kê hồ sơ liên quan và nguồn evidence.',
  },
  {
    name: 'Phát hiện một mã khách hàng có nhiều định danh',
    command: 'customer-many-identities-alert',
    category: 'Kiểm tra dữ liệu và cảnh báo',
    oneliner: 'Phát hiện mã khách hàng có nhiều CCCD hoặc CMND.',
    prompt:
      'Kiểm tra mã khách hàng {{ma_khach_hang}} có gắn với nhiều CCCD/CMND hoặc nhiều tên không. Phân biệt trường hợp tổ chức/người đại diện với khả năng sai lệch dữ liệu.',
  },
  {
    name: 'Danh sách cảnh báo dùng chung số điện thoại',
    command: 'shared-phone-alerts',
    category: 'Kiểm tra dữ liệu và cảnh báo',
    oneliner: 'Tổng hợp cảnh báo nhiều khách hàng dùng chung số điện thoại.',
    prompt:
      'Tổng hợp các cảnh báo nhiều khách hàng dùng chung số điện thoại, ưu tiên mức {{muc_do:high|medium|low}}. Liệt kê số điện thoại, số lượng thực thể, mã khách hàng, CCCD và lý do cảnh báo.',
  },
  {
    name: 'Danh sách cảnh báo dùng chung địa chỉ',
    command: 'shared-address-alerts',
    category: 'Kiểm tra dữ liệu và cảnh báo',
    oneliner: 'Tổng hợp cảnh báo nhiều khách hàng dùng chung địa chỉ.',
    prompt:
      'Tổng hợp các cảnh báo nhiều khách hàng dùng chung địa chỉ, ưu tiên mức {{muc_do:high|medium|low}}. Liệt kê địa chỉ, số thực thể, định danh và quan hệ đã phát hiện.',
  },
  {
    name: 'Báo cáo cảnh báo rủi ro tổng hợp',
    command: 'risk-alert-summary',
    category: 'Kiểm tra dữ liệu và cảnh báo',
    oneliner: 'Tổng hợp các cảnh báo định danh và quan hệ nổi bật.',
    prompt:
      'Lập báo cáo cảnh báo rủi ro tổng hợp với tối đa {{so_luong:20|50|100}} kết quả. Phân nhóm theo trùng CCCD, dùng chung phone, dùng chung địa chỉ, một mã khách hàng nhiều định danh và hồ sơ cần phân giải.',
  },
];

module.exports = { agentAiExcelPrompts };
