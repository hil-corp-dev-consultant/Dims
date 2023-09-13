﻿using System;
using System.Web;
using System.IO;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using System.Data;
using iTextSharp.text.pdf;
using iTextSharp.text.html.simpleparser;
using iTextSharp.text;

namespace DIMS
{
    public class ExcelUtility
    {
        // Get the excel column letter by index
        public static string ColumnLetter(int intCol)
        {
            int intFirstLetter = ((intCol) / 676) + 64;
            int intSecondLetter = ((intCol % 676) / 26) + 64;
            int intThirdLetter = (intCol % 26) + 65;

            char FirstLetter = (intFirstLetter > 64) ? (char)intFirstLetter : ' ';
            char SecondLetter = (intSecondLetter > 64) ? (char)intSecondLetter : ' ';
            char ThirdLetter = (char)intThirdLetter;

            return string.Concat(FirstLetter, SecondLetter, ThirdLetter).Trim();
        }

        // Create a text cell
        private static Cell CreateTextCell(string header, UInt32 index, string text)
        {
            var cell = new Cell { DataType = CellValues.InlineString, CellReference = header + index, };

           
            //ws.Cells[row, clmn].Interior.Color = XlRgbColor.rgbBlack;
           
            var istring = new InlineString();
            var t = new Text { Text = text };
            istring.Append(t);
            cell.Append(istring);
            return cell;
        }

        public static MemoryStream GetExcel(DataTable data)
        {
            string[] fieldsToExpose = new string[data.Columns.Count];
            for (int i = 0; i < data.Columns.Count; i++)
            {
                fieldsToExpose[i] = data.Columns[i].ColumnName;
            }

            return GetExcel(fieldsToExpose,data);
        }
        public static byte[] GetPDF(string pHTML)
        {
            byte[] bPDF = null;

            MemoryStream ms = new MemoryStream();
            TextReader txtReader = new StringReader(pHTML);

            // 1: create object of a itextsharp document class
            //Document doc = new Document(PageSize.A4, 25, 25, 25, 25);
            Document doc = new Document();

            // 2: we create a itextsharp pdfwriter that listens to the document and directs a XML-stream to a file
            PdfWriter oPdfWriter = PdfWriter.GetInstance(doc, ms);

            // 3: we create a worker parse the document
            HTMLWorker htmlWorker = new HTMLWorker(doc);

            // 4: we open document and start the worker on the document
            doc.Open();
            htmlWorker.StartDocument();

            // 5: parse the html into the document
            htmlWorker.Parse(txtReader);

            // 6: close the document and the worker
            htmlWorker.EndDocument();
            htmlWorker.Close();
            doc.Close();

            bPDF = ms.ToArray();

            return bPDF;
        }
        public static MemoryStream GetExcel(string[] fieldsToExpose, DataTable data)
        {
            MemoryStream stream = new MemoryStream();
            UInt32 rowcount = 0;

            // Create the Excel document
            var document = SpreadsheetDocument.Create(stream, SpreadsheetDocumentType.Workbook);
            var workbookPart = document.AddWorkbookPart();
            var worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
            var relId = workbookPart.GetIdOfPart(worksheetPart);

            var workbook = new Workbook();
            var fileVersion = new FileVersion { ApplicationName = "Microsoft Office Excel" };
            var worksheet = new Worksheet();
            var sheetData = new SheetData();
            


           
            worksheet.Append(sheetData);
            worksheetPart.Worksheet = worksheet;

            var sheets = new Sheets();
            var sheet = new Sheet { Name = "Sheet1", SheetId = 1, Id = relId };
            sheets.Append(sheet);
            workbook.Append(fileVersion);
            workbook.Append(sheets);
            document.WorkbookPart.Workbook = workbook;
            document.WorkbookPart.Workbook.Save();
          
            // Add header to the sheet
            var row = new Row { RowIndex = ++rowcount };
            for (int i = 0; i < fieldsToExpose.Length; i++)
            {
                row.Append(CreateTextCell(ColumnLetter(i), rowcount, fieldsToExpose[i]));
            }
            sheetData.AppendChild(row);
            worksheetPart.Worksheet.Save();
            
            // Add data to the sheet
            foreach (DataRow dataRow in data.Rows)
            {
                row = new Row { RowIndex = ++rowcount };
                for (int i = 0; i < fieldsToExpose.Length; i++)
                {
                    row.Append(CreateTextCell(ColumnLetter(i), rowcount, dataRow[fieldsToExpose[i]].ToString()));
                }
                sheetData.AppendChild(row);
            }
            worksheetPart.Worksheet.Save();

            document.Close();
            return stream;
        }
    }
}