// カスタムエラーのベースクラス
export class BaseError extends Error {
  // Viewで表示するためのメッセージを保持するプロパティ
  public displayMessage: string;
  // エラーコード
  public errorCode: string;
  // 追加のコンテキスト情報
  public metadata?: Record<string, any>;

  // コンストラクタ
  constructor(
    message: string,
    displayMessage?: string,
    errorCode?: string,
    metadata?: Record<string, any>
  ) {
    super(message); // 親クラスのコンストラクタを呼び出す
    this.logError(message); // エラーメッセージをコンソールに表示
    this.name = this.constructor.name; // エラー名をクラス名に設定
    this.displayMessage = displayMessage || message; // displayMessageを初期化
    this.errorCode = errorCode || "UNKNOWN_ERROR"; // エラーコードを初期化
    this.metadata = metadata || {}; // コンテキスト情報を初期化
    Object.setPrototypeOf(this, new.target.prototype); // プロトタイプの修正（TypeScript固有の対策）
  }

  // メッセージをconsole.errorに表示するプライベートメソッド
  private logError(message: string): void {
    console.error(message);
  }
}
