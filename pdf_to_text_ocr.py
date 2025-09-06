#!/usr/bin/env python3
import pymupdf
import pytesseract
from PIL import Image
import os
import io

def convert_pdf_to_text_ocr(pdf_path, output_path):
    """OCRを使用してPDFファイルをテキストファイルに変換する"""
    text = ""
    
    try:
        # PDFを開く
        doc = pymupdf.open(pdf_path)
        print(f"PDFページ数: {len(doc)}")
        
        for i in range(len(doc)):
            print(f"ページ {i+1} を処理中...")
            
            # ページを画像として取得
            page = doc[i]
            mat = pymupdf.Matrix(2, 2)  # 2倍の解像度で取得
            pix = page.get_pixmap(matrix=mat)
            
            # 画像データをPIL Imageに変換
            img_data = pix.tobytes("png")
            img = Image.open(io.BytesIO(img_data))
            
            # OCRでテキストを抽出
            try:
                page_text = pytesseract.image_to_string(img, lang='eng')
                if page_text.strip():
                    text += f"=== ページ {i+1} ===\n"
                    text += page_text + "\n\n"
                    print(f"ページ {i+1} からテキストを抽出しました")
                else:
                    print(f"ページ {i+1} からテキストを抽出できませんでした")
            except Exception as e:
                print(f"ページ {i+1} のOCR処理でエラー: {e}")
        
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
    output_path = os.path.expanduser("~/Downloads/securitybook_ocr.txt")
    
    convert_pdf_to_text_ocr(pdf_path, output_path)
