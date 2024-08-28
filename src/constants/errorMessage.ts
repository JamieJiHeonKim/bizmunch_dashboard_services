export const VALIDATION = 'Invalid format';
export const UNAUTH = 'authorization failed - no bearer';
export const ADMIN_APPLYING = '現在審査中です。\nお待ちください。';
export const CONFLICT = 'Conflict';
export const DATANOTFOUND = 'Data not found';
export const PAGENOTFOUND = 'Page not found';
export const BADIMPLEMENTATION = 'サーバー内でエラーが起きました。';
export const USERNOTACTIVATE = 'User does not activate yet';
export const DATAEXCEED = 'You exceed the limit.';

export const RESET_TOKEN_NOT_FOUND = 'トークンが存在しません。';
export const RESET_TOKEN_ALREADY_USED = 'トークンが既に使われています。';
export const INVALID_RESET_TOKEN = '利用できないトークンです。';
export const INVALID_JWT_TOKEN = 'JWTトークンが不正です。';
export const NOT_ACCESS_ALLOWED = 'このAPIへのアクセス権限がありません。';
export const ADMIN_NOT_FOUND = '管理者が存在しません。';
export const BOOTH_NOT_EXIST = 'ブースが存在しません。';
export const EMAIL_EXIST = 'メールアドレスが既に利用されてます。';
export const EMAIL_NOT_FOUND = 'メールアドレスが存在しません。';
export const INVALID_SALON_ID = 'サロンIDが正しくありません。';
export const INVALID_ADMIN_ID = '管理者IDが正しくありません。';
export const INVALID_BOOTH_ID = 'ブースIDが正しくありません。';
export const INVALID_ACCESS = '不正なアクセスです。';
export const BOOTH_NAME_EXIST =
  'このサロンでブース名が既に登録されてます。違うブース名を利用してください';
export const SALON_NOT_EXIST = 'サロンが存在しません。';
export const DISABLE_DATE_NOT_EXIST = '日付が存在しません。';
export const RESERVATION_NOT_EXIST = '予約が存在しません。';
export const USER_NOT_EXIST = '利用者が存在しません。';
export const CUSTOMER_NOT_EXIST = 'PAYJPに顧客情報が登録されてません。';
export const CUSTOMER_ALREADY_EXIST = 'PAYJPに既に顧客情報が登録されてます。';
export const PAYMENT_NOT_EXIST = '決済情報が存在しません。';
export const NOT_ENOUGH_POINT = 'ポイントが足りません。';
export const NOT_ABLE_TO_CANCEL_RESERVATION =
  '1時間以内の予約はキャンセルできません。';
export const PRODUCT_NOT_EXIST = 'PAYJPに商品情報が存在しません。';
export const DISABLE_DATE_EXIST = 'この日付は既に不可です。';
export const RESERVATION_ALREADY_EXIST = '予約が既に存在します。';
export const PASSWORD_NOT_MATCH = 'パスワードが違います。';
export const EMAIL_NOT_MATCH = 'メールアドレスが登録されていません。';

export const PAYJP_INVALID_CARD = 'クレジット情報にエラーが出ております。';

// INVALID_REGISTRATION_TOKEN

export const INVALID_REGISTRATION_TOKEN = '登録トークンが不正です。';

// INVALID_EMAIL

export const INVALID_EMAIL = 'メールアドレスが不正です。';

// INVALID_TOKEN

export const INVALID_TOKEN = 'トークンが不正です。';

// convet all above into this formate

export const MESSAGES = {
    // common error message
    VALIDATION: 'Invalid format',
    UNAUTH: 'Authentication failed.',
    notFound: 'Data not found',
    CONFLICT: 'Conflict',
    DATANOTFOUND: 'Data not found',
    PAGENOTFOUND: 'Page not found',
    BADIMPLEMENTATION: 'Server error.',
    'USER NOT ACTIVATE': 'User does not activate yet',
    'DATA EXCEED': 'You exceed the limit.',
    USER_NOT_AUTHORIZE: 'User not authorized',

    // parent Child error message

    child_login_id_exist: 'Child login id already exist',
    Child_not_found: 'Child not found',
    Child_already_exist: 'Child already exist',
    child_delete: 'Child delete successfully',
    child_update: 'Child update successfully',
    child_add: 'Child add successfully',
    login_id_available: 'Login id available',
    child_not_exist: 'Child not exist',
    get_children: 'Get children successfully',
    subscription_failed: 'Subscription failed',
    subscription_success: 'Subscription success',
    payment_failed: 'Payment failed',

    // Stripe error message
    stripe_account_not_found: 'Stripe account not found',
    parent_not_found: 'Parent not found',
    card_already_exists: 'Card already exists',
    card_added_successfully: 'Card added successfully',
    card_updated_successfully: 'Card updated successfully',
    card_deleted_successfully: 'Card deleted successfully',
    card_marked_default: 'Card marked default',
    card_cvc_check_failed: 'Card cvc check failed',
    payment_method_not_found: 'Card not Fount',

    ////////////////////////////////////////////////////////////////////

    ADMIN_APPLYING: 'Currently under review. \nPlease wait',
    USERNOTACTIVATE: 'User does not activate yet',
    DATAEXCEED: 'You exceed the limit.',
    RESET_TOKEN_NOT_FOUND: 'Reset Token not found',
    RESET_TOKEN_ALREADY_USED: 'Reset Token already used',
    INVALID_RESET_TOKEN: 'Invalid Reset Token',
    INVALID_JWT_TOKEN: 'Invalid JWT Token',
    NOT_ACCESS_ALLOWED: 'Access not allowed',
    ADMIN_NOT_FOUND: 'ADMIN not found',
    BOOTH_NOT_EXIST: 'Booth does not exist',
    EMAIL_EXIST: 'Email already exists',
    EMAIL_NOT_FOUND: 'Email not found',
    INVALID_SALON_ID: 'Invalid Salon ID',
    INVALID_ADMIN_ID: 'Invalid Admin ID',
    INVALID_BOOTH_ID: 'Invalid Booth ID。',
    INVALID_ACCESS: 'Invalid Access',
    BOOTH_NAME_EXIST:
      'The booth name is already registered in this salon. Please use a different booth name',
    SALON_NOT_EXIST: 'Salon does not exist.',
    DISABLE_DATE_NOT_EXIST: 'Date does not exist',
    RESERVATION_NOT_EXIST: 'Reservation does not exist.',
    USER_NOT_EXIST: 'User does not exist.',
    CUSTOMER_NOT_EXIST: 'Customer information is not registered in PAYJP.',
    CUSTOMER_ALREADY_EXIST:
      'Customer information is already registered in PAYJP.',
    PAYMENT_NOT_EXIST: 'Payment information does not exist.',
    NOT_ENOUGH_POINT: 'Not enough points.',
    NOT_ABLE_TO_CANCEL_RESERVATION:
      'Reservations within 1 hour cannot be canceled.',
    PRODUCT_NOT_EXIST: 'Product information does not exist on PAYJP.',
    PRODUCT_DELETE_FAIL:'Product deletion failed',
    PRODUCT_ALREADY_DELETED: "Product already deleted",

    DISABLE_DATE_EXIST: 'This date is no longer possible.',
    RESERVATION_ALREADY_EXIST: 'Reservation already exists.',
    PASSWORD_NOT_MATCH: 'Password not match',
    EMAIL_NOT_MATCH: 'Email not match',
    PAYJP_INVALID_CARD: 'There is an error in your credit information.',
    INVALID_REGISTRATION_TOKEN: 'The registration token is invalid。',
    INVALID_EMAIL: 'Invalid email address。',
    INVALID_TOKEN: 'Token is invalid.',
    DELETED_ACCOUNT_ACCESS:
      'Your account is already deleted. Please contact through customer service',
    date_error: 'Date must be with in next 72 hours',

};


//   ja: {
//     // common error message
//     VALIDATION: 'フォーマットが不正です。',
//     UNAUTH: '認証に失敗しました。',
//     notFound: 'データが存在しません。',
//     CONFLICT: 'データが重複しています。',
//     DATANOTFOUND: 'データが存在しません。',
//     PAGENOTFOUND: 'ページが存在しません。',
//     BADIMPLEMENTATION: 'サーバー内でエラーが起きました。',
//     'USER NOT ACTIVATE': 'ユーザーが有効化されていません。',
//     'DATA EXCEED': 'データが上限を超えています。',
//     USER_NOT_AUTHORIZE: 'ユーザーが許可されていません',

//     // parent Child error message

//     child_login_id_exist: '子供のログインIDが既に存在しています。',
//     Child_not_found: '子供が存在しません。',
//     Child_already_exist: '子供が既に存在しています。',
//     child_delete: '子供を削除しました。',
//     child_update: '子供を更新しました。',
//     child_add: '子供を追加しました。',
//     login_id_available: 'ログインIDが利用可能です。',
//     child_not_exist: '子供が存在しません。',
//     get_children: '子供を取得しました。',
//     subscription_failed: 'サブスクリプションに失敗しました。',
//     subscription_success: 'サブスクリプションに成功しました。',
//     payment_failed: '支払いに失敗しました。',

//     // Stripe error message
//     stripe_account_not_found: 'Stripeアカウントが存在しません。',
//     parent_not_found: 'ユーザーが存在しません。',
//     card_already_exists: 'カードが既に存在しています。',
//     card_added_successfully: 'カードを追加しました。',
//     card_updated_successfully: 'カードを更新しました。',
//     card_deleted_successfully: 'カードを削除しました。',
//     card_marked_default: 'カードをデフォルトにしました。',
//     card_cvc_check_failed: 'カードのCVCチェックに失敗しました。',
//     payment_method_not_found: 'Card not Fount',

//     ///////////////////////

//     ADMIN_APPLYING: '現在審査中です。\nお待ちください。',
//     USERNOTACTIVATE: 'User does not activate yet',
//     DATAEXCEED: 'You exceed the limit.',
//     RESET_TOKEN_NOT_FOUND: 'トークンが存在しません。',
//     RESET_TOKEN_ALREADY_USED: 'トークンが既に使われています。',
//     INVALID_RESET_TOKEN: '利用できないトークンです。',
//     INVALID_JWT_TOKEN: 'JWTトークンが不正です。',
//     NOT_ACCESS_ALLOWED: 'このAPIへのアクセス権限がありません。',
//     ADMIN_NOT_FOUND: '管理者が存在しません。',
//     BOOTH_NOT_EXIST: 'ブースが存在しません。',
//     EMAIL_EXIST: 'メールアドレスが既に利用されてます。',
//     EMAIL_NOT_FOUND: 'メールアドレスが存在しません。',
//     INVALID_SALON_ID: 'サロンIDが正しくありません。',
//     INVALID_ADMIN_ID: '管理者IDが正しくありません。',
//     INVALID_BOOTH_ID: 'ブースIDが正しくありません。',
//     INVALID_ACCESS: '不正なアクセスです。',
//     BOOTH_NAME_EXIST:
//       'このサロンでブース名が既に登録されてます。違うブース名を利用してください',
//     SALON_NOT_EXIST: 'サロンが存在しません。',
//     DISABLE_DATE_NOT_EXIST: '日付が存在しません。',
//     RESERVATION_NOT_EXIST: '予約が存在しません。',
//     USER_NOT_EXIST: '利用者が存在しません。',
//     CUSTOMER_NOT_EXIST: 'PAYJPに顧客情報が登録されてません。',
//     CUSTOMER_ALREADY_EXIST: 'PAYJPに既に顧客情報が登録されてます。',
//     PAYMENT_NOT_EXIST: '決済情報が存在しません。',
//     NOT_ENOUGH_POINT: 'ポイントが足りません。',
//     NOT_ABLE_TO_CANCEL_RESERVATION: '1時間以内の予約はキャンセルできません。',
//     PRODUCT_NOT_EXIST: 'PAYJPに商品情報が存在しません。',
//     PRODUCT_DELETE_FAIL:'商品の削除に失敗しました',
//     PRODUCT_ALREADY_DELETED:'製品は既に削除されています',
//     DISABLE_DATE_EXIST: 'この日付は既に不可です。',
//     RESERVATION_ALREADY_EXIST: '予約が既に存在します。',
//     PASSWORD_NOT_MATCH: 'パスワードが違います。',
//     EMAIL_NOT_MATCH: 'メールアドレスが登録されていません。',
//     PAYJP_INVALID_CARD: 'クレジット情報にエラーが出ております。',
//     INVALID_REGISTRATION_TOKEN: '登録トークンが不正です。',
//     INVALID_EMAIL: 'メールアドレスが不正です。',
//     INVALID_TOKEN: 'トークンが不正です。',
//     DELETED_ACCOUNT_ACCESS:
//       'アカウントが既に削除されています。カスタマーサポートよりお問合せください。',
//     date_error: '日付は次の 72 時間以内でなければなりません',
//   }