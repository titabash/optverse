import 'package:flutter/material.dart';
import 'package:webview_flutter/webview_flutter.dart';

class WebViewExample extends StatefulWidget {
  @override
  _WebViewExampleState createState() => _WebViewExampleState();
}

class _WebViewExampleState extends State<WebViewExample> {
  late WebViewController _controller;

  @override
  void initState() {
    super.initState();
    _controller = WebViewController()
      ..setJavaScriptMode(JavaScriptMode.unrestricted)
      ..setNavigationDelegate(
        NavigationDelegate(
          onPageFinished: (String url) {
            _extractCookies();
          },
        ),
      )
      ..loadRequest(Uri.parse('https://www.rakuten.co.jp'));
  }

  Future<void> _extractCookies() async {
    final String cookies = await _controller.runJavaScriptReturningResult(
      "document.cookie",
    ) as String;

    // デバッグ用にCookieを出力
    print('Cookies: $cookies');
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('WebView Debug Example')),
      body: WebViewWidget(controller: _controller),
    );
  }
}
