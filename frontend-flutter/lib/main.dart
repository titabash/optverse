import 'package:flutter/material.dart';
import 'webview_example.dart'; // WebViewExampleウィジェットを含むファイル

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'WebView Cookie Debug',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: WebViewExample(),
    );
  }
}
