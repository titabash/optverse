// 必要なモジュールをインポート
const WeaveDB = require("weavedb-sdk-node");
const fs = require("fs");
const Arweave = require("arweave");
const EthWallet = require("ethereumjs-wallet").default;

// 使用するウォレットとコントラクトの情報を定義
const arweave_wallet = "scripts/.wallets/wallet-mainnet.json";

// WeaveDBインスタンスのコントラクトのTXIDを定義
const contractTxId = "ZIZK-xoFF_DeNDNHaH0CPcOSPrhdGcGrPk6ZcYnrIW8";

// 管理者のウォレット情報を読み込む
const adminWallet = JSON.parse(fs.readFileSync(arweave_wallet).toString());

// Arweaveのネットワーク情報を定義
const arweaveNetworkMainnet = {
  host: "arweave.net",
  port: 443,
  protocol: "https",
};

// Arweaveのインスタンスを初期化
const arweave = Arweave.init(arweaveNetworkMainnet);

// スキーマを定義
const schema = {
  type: "object",
  required: ["article_id", "date", "user_address"],
  properties: {
    article_id: {
      type: "string",
    },
    user_address: {
      type: "string",
    },
    date: {
      type: "number",
    },
  },
};

// メインの処理を定義
const main = async () => {
  // 管理者のウォレット情報を取得
  const wallet = await arweave.wallets.jwkToAddress(adminWallet);
  console.log(wallet);
  // WeaveDBのインスタンスを初期化
  const db = new WeaveDB({
    contractTxId,
  });
  // デフォルトのウォレットを設定
  db.setDefaultWallet(adminWallet, "ar");
  console.log(await db.getOwner());
  const rules = { "allow create": true }; // アクセス制御ルールのテンプレート

  try {
    // スキーマを設定
    const result = await db.setSchema(schema, "bookmarks");
    console.log("setScheme", await result.getResult());
    // アクセス制御ルールを設定
    const result2 = await db.setRules(rules, "bookmarks", { ar: adminWallet });
    console.log("setRules", await result2.getResult());
    // データを追加
    const data = {
      article_id: "456",
      user_address: "0x1234567890",
      date: Date.now(),
    };
    const result3 = await db.add(data, "bookmarks");
    console.log("add", await result3.getResult());
    // データを取得
    console.log(await db.cget("bookmarks", 5));
  } catch (e) {
    console.log(e);
  }
  process.exit(1);
};

// メインの処理を実行
main();
