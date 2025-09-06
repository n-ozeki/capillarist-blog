#!/usr/bin/env python3
import pdfplumber
import os

def convert_pdf_to_text(pdf_path, output_path):
    """PDFファイルをテキストファイルに変換する"""
    text = ""
    
    try:
        with pdfplumber.open(pdf_path) as pdf:
            print(f"PDFページ数: {len(pdf.pages)}")
            
            for i, page in enumerate(pdf.pages):
                print(f"ページ {i+1} を処理中...")
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n\n"
                else:
                    print(f"ページ {i+1} からテキストを抽出できませんでした")
        
        # テキストファイルに保存
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(text)
        
        print(f"変換完了！")
        print(f"出力ファイル: {output_path}")
        print(f"テキストサイズ: {len(text)} 文字")
        
    except Exception as e:
        print(f"エラーが発生しました: {e}")

if __name__ == "__main__":
    pdf_path = os.path.expanduser("~/Downloads/securitybook.pdf")
    output_path = os.path.expanduser("~/Downloads/securitybook.txt")
    
    convert_pdf_to_text(pdf_path, output_path)
