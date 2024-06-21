
            document.addEventListener('DOMContentLoaded', function() {
                const url = '/Users/alexbrown/Desktop/Journal/Journal.pdf';  // Replace with your PDF file path
            
                let pdfDoc = null;
                const scale = 1.5,
                      container = document.querySelector('.gallery'),
                      textContainer = document.querySelector('.text-content');
            
                const renderPage = num => {
                    return pdfDoc.getPage(num).then(page => {
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
            
                        // Set scale
                        const viewport = page.getViewport({ scale });
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
            
                        const renderCtx = {
                            canvasContext: ctx,
                            viewport
                        };
            
                        return page.render(renderCtx).promise.then(() => {
                            const pageDiv = document.createElement('div');
                            pageDiv.className = 'page';
                            pageDiv.appendChild(canvas);
                            container.appendChild(pageDiv);
            
                            // Apply transition
                            setTimeout(() => {
                                pageDiv.style.opacity = 1;
                            }, num * 100);  // Stagger the appearance based on page number
                        });
                    });
                };
            
                // Render the text
                const renderText = () => {
                    textData.forEach(page => {
                        const textDiv = document.createElement('div');
                        textDiv.className = 'text-page';
                        textDiv.innerHTML = `<h2>Page ${page.page_num}</h2><p>${page.text}</p>`;
                        textContainer.appendChild(textDiv);
                    });
                };
            
                // Get document
                pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
                    pdfDoc = pdfDoc_;
            
                    // Render all pages in order
                    const renderPages = async () => {
                        for (let i = 1; i <= pdfDoc.numPages; i++) {
                            await renderPage(i);
                        }
                    };
            
                    renderPages();
                    renderText();
                }).then(() => {
                    console.log('All pages and text rendered');
                }).catch(err => {
                    console.error('Error rendering PDF:', err);
                });
            });
            