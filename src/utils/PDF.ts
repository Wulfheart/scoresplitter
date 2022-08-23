import * as PDFJSlib from "pdfjs-dist";
import { PDFDocument } from "pdf-lib";
PDFJSlib.GlobalWorkerOptions.workerSrc = "/public/pdf.worker.min.js";

export class PDF {
  file!: File;
  document!: PDFJSlib.PDFDocumentProxy;
  numPages!: number;
  imgs: Array<string> = [];

  static async fromFile(file: File): Promise<PDF> {
    let pdf = new PDF();
    await pdf.constructFromFile(file);

    return pdf;
  }

  private async constructFromFile(file: File) {
    this.file = file;
    let buffer = await file.arrayBuffer();
    let arr = new Uint8Array(buffer);
    let loadingTask = PDFJSlib.getDocument(arr);
    this.document = await loadingTask.promise;
    this.numPages = this.document.numPages;

    for (let i = 1; i <= this.numPages; i++) {
      this.imgs.push(await this.renderImage(i));
    }
  }

  private async renderImage(pageNum: number): Promise<string> {
    let page = await this.document.getPage(pageNum);
    let canvas = document.createElement("canvas");
    canvas.width = page.getViewport().viewBox[2];
    canvas.height = page.getViewport().viewBox[3];

    let viewport = page.getViewport({ scale: 1.0 });
    let ctx = canvas.getContext("2d");
    if (ctx == null) {
      throw new Error("");
    }

    let renderTask = page.render({ canvasContext: ctx, viewport: viewport });

    await renderTask.promise;
    console.debug(canvas);
    return canvas.toDataURL("image/jpeg");
  }

  public async save(
    target: FileSystemDirectoryHandle,
    parts: Array<string>,
    prefix: string
  ): Promise<void> {
    let res = parts
      .filter((s) => s.trim() != "")
      .map((s) => parts.findIndex((n) => n == s))
      .sort();
    res.push(this.numPages);

    let buffer = await this.file.arrayBuffer();
    let arr = new Uint8Array(buffer);
    let existingDoc = await PDFDocument.load(arr)
    console.log(existingDoc.getPages().length)
    for (let i = 0; i < res.length - 1; i++) {
      let currentPageIndex = res[i];
      let nextPartPageIndex = res[i + 1];
      let pageNumbers: Array<number> = []
      for (let index = currentPageIndex; index < nextPartPageIndex; index++) {
        pageNumbers.push(index)
      }
      console.log(pageNumbers)

      const pdfDoc = await PDFDocument.create();
      const copied = await pdfDoc.copyPages(existingDoc, pageNumbers)

      copied.forEach(copy => {
        pdfDoc.addPage(copy)
      });
      
      console.log(pdfDoc.getPages().length)
      
      const pdfBytes = await pdfDoc.save();

      const newFileHandle = await target.getFileHandle(prefix + parts[currentPageIndex] + ".pdf", { create: true });
      let writable = await newFileHandle.createWritable()
      await writable.write(pdfBytes)
      await writable.close()
      
    }
  }
}
