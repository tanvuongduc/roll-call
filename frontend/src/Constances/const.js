export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const ROLE = {
  RECEPTIONIST: { name: "Tiếp Đón", value: "tiep_don" },
  DOCTOR: { name: "Bác Sĩ", value: "bac_si" },
  TEST_OPERATOR: { name: "Xét Nghiệm", value: "xet_nghiem" },
  ACCOUNTER: { name: "Thu Ngân", value: "thu_ngan" },
  PHARMACIST: { name: "Dược Sĩ", value: "duoc_si" },
  ADMIN: { name: "Admin", value: "admin" },
  // RECEPTIONIST: 'nhan_vien',
};
// export const ROLE_ID = {
//   1: { name: "Nhân Viên", value: "nhan_vien" },
//   2: { name: "Quản lý", value: "quan_ly" },
//   3: { name: "Admin", value: "admin" },
//   // RECEPTIONIST: 'nhan_vien',
// };

export const STATUS = {
  NEW: "new",
  READY: "ready",
  RUNNING: "running",
  CANCEL: "cancel",
  DONE: "done",
  PAID: "paid",
};

export const LOCALSTORAGE = {
  TOKEN: "token",
  USER: "user",
  LOCATION: "location",
};

export const SERVICE_TYPE = {
  EXAM: "exam",
  TEST: "test",
  OTHER: "other",
};

export const STEP_TYPE = {
  EXAM: "exam",
  TEST: "test",
  BUY: "buy",
};

export const ORDER_TYPE = {
  OTC: "otc_drug", // thuốc bổ sung bán tại quầy
  ETC: "etc_drug", // thuốc theo toa
  OTHER: "other",
};

export const LOCATION_TYPE = {
  EXAMINATION: "PK",
  EMERGENCY: "CC",
  XRAY: "XQ",
  TESTING: "XN",
  PHARMACY: "QT",
};

export const REGEX_TEL = "^0\\d{9,11}$";
export const REGEX_DATE =
  "^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\\d{4}$";

export const ERR_MSG = {
  EMAIL: "Sai định dạng email, vui lòng kiểm tra lại",
  REQUIRED: "*",
  MIN: "Giá trị phải lớn hơn: ",
  MAX: "Giá trị phải nhỏ hơn: ",
  MIN_LENGTH: "Độ dài phải lớn hơn: ",
  MAX_LENGTH: "Độ dài phải nhỏ hơn: ",
  P_TEL: "Vui lòng kiểm tra lại số điện thoại",
  P_DATE: "Sai định dạng thời gian, vui lòng kiểm tra lại",
  CF_PASSWORD: "Mật khẩu không trùng nhau",
};

export const ONE_DAY = 1000 * 60 * 60 * 24;
