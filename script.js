document.addEventListener('DOMContentLoaded', () => {
    const url = 'Journal.pdf';
    const loadingTask = pdfjsLib.getDocument(url);

    loadingTask.promise.then(pdf => {
        const container = document.querySelector('.gallery');
        const toc = document.querySelector('.toc');
        const numPages = pdf.numPages;

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            pdf.getPage(pageNum).then(page => {
                const scale = 0.5;
                const viewport = page.getViewport({ scale });
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                canvas.height = viewport.height;
                canvas.width = viewport.width;

                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };
                page.render(renderContext).promise.then(() => {
                    const div = document.createElement('div');
                    div.className = 'page';
                    div.appendChild(canvas);
                    container.appendChild(div);

                    const tocItem = document.createElement('div');
                    tocItem.textContent = `Page ${pageNum}`;
                    toc.appendChild(tocItem);

                    // Adding fade-in effect
                    div.style.opacity = 0;
                    div.style.transition = `opacity 3s ease-in-out ${pageNum * 0.1}s`;
                    setTimeout(() => {
                        div.style.opacity = 1;
                    }, 100);
                });
            });
        }
    }, reason => {
        console.error(reason);
    });
});
