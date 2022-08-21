import * as PDFJSlib from "pdfjs-dist";
PDFJSlib.GlobalWorkerOptions.workerSrc = "/public/pdf.worker.min.js"

export class PDF {
    file!: File;
    document!: PDFJSlib.PDFDocumentProxy
    numPages!: number;
    imgs: Array<string> = []




    static async fromFile(file: File): Promise<PDF>{
        let pdf = new PDF()
        await pdf.constructFromFile(file)
       
        return pdf
        
    }

    private async constructFromFile(file: File) {
        this.file = file
        let buffer = await file.arrayBuffer()
        let arr = new Uint8Array(buffer)
        let loadingTask = PDFJSlib.getDocument(arr)
        this.document = await loadingTask.promise
        this.numPages = this.document.numPages

        for (let i = 1; i <= this.numPages; i++) {
           this.imgs.push(await this.renderImage(i))
        }

    }

    private async renderImage(pageNum: number): Promise<string> {
        let page = await this.document.getPage(pageNum)
        let canvas = document.createElement('canvas')
        canvas.width = page.getViewport().viewBox[2]
        canvas.height = page.getViewport().viewBox[3]

        let viewport = page.getViewport({scale: 1.0})
        let ctx =  canvas.getContext("2d")
        if (ctx == null) {
        throw new Error("");
        
        }

        let renderTask = page.render({canvasContext: ctx, viewport: viewport})

        await renderTask.promise
        console.debug(canvas)
        return canvas.toDataURL("image/jpeg")

    }
}
