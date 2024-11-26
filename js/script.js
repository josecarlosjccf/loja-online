document.addEventListener('DOMContentLoaded', () => {
    const produtos = document.querySelectorAll('.produto');
    const popup = document.getElementById('popup');
    const popupContent = document.querySelector('.popup-content');
    const popupImagesContainer = document.querySelector('.popup-images');
    const popupTitulo = document.querySelector('.popup-titulo');
    const popupPreco = document.querySelector('.popup-preco');
    const popupDescricao = document.querySelector('.popup-descricao');
    const closeBtn = document.querySelector('.close');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentIndex = 0;
    let currentImages = [];

    // Function to calculate and set optimal image dimensions
    function setOptimalImageDimensions(imgElement) {
        // Get the container dimensions
        const containerWidth = popupImagesContainer.clientWidth;
        const containerHeight = popupImagesContainer.clientHeight;
        const maxWidth = Math.min(containerWidth - 100, 747); // 747px is max width from CSS
        const maxHeight = Math.min(containerHeight, 560); // 560px is max height from CSS

        // Reset dimensions to allow natural size calculation
        imgElement.style.width = '';
        imgElement.style.height = '';

        // Wait for image to load to get its natural dimensions
        imgElement.onload = () => {
            const naturalWidth = imgElement.naturalWidth;
            const naturalHeight = imgElement.naturalHeight;
            const aspectRatio = naturalWidth / naturalHeight;

            let newWidth, newHeight;

            // Calculate new dimensions while maintaining aspect ratio
            if (naturalWidth > naturalHeight) {
                // Landscape image
                newWidth = Math.min(maxWidth, naturalWidth);
                newHeight = newWidth / aspectRatio;
                
                // Check if height exceeds maximum
                if (newHeight > maxHeight) {
                    newHeight = maxHeight;
                    newWidth = newHeight * aspectRatio;
                }
            } else {
                // Portrait image
                newHeight = Math.min(maxHeight, naturalHeight);
                newWidth = newHeight * aspectRatio;
                
                // Check if width exceeds maximum
                if (newWidth > maxWidth) {
                    newWidth = maxWidth;
                    newHeight = newWidth / aspectRatio;
                }
            }

            // Apply new dimensions
            imgElement.style.width = `${newWidth}px`;
            imgElement.style.height = `${newHeight}px`;
            
            // Center the image container
            imgElement.style.margin = 'auto';
        };
    }

    // Function to update popup image
    function updatePopupImage() {
        if (currentImages.length > 0) {
            const imgElement = popupImagesContainer.querySelector('.popup-img');
            imgElement.src = currentImages[currentIndex].src;
            imgElement.alt = currentImages[currentIndex].alt;
            
            // Apply optimal dimensions
            setOptimalImageDimensions(imgElement);

            // Update navigation buttons visibility
            prevBtn.style.display = currentImages.length > 1 ? 'flex' : 'none';
            nextBtn.style.display = currentImages.length > 1 ? 'flex' : 'none';
        }
    }

    // Function to show popup
    function showPopup(produto) {
        // Get product information
        const titulo = produto.querySelector('.titulo_produto').textContent;
        const preco = produto.querySelector('.preco_produto').textContent;
        const descricao = produto.querySelector('.descricao_produto').textContent;

        // Get all images from the product
        currentImages = Array.from(produto.querySelectorAll('.popup-img'));
        currentIndex = 0;

        // Update popup content
        popupTitulo.textContent = titulo;
        popupPreco.textContent = preco;
        popupDescricao.textContent = descricao;

        // Show popup
        popup.style.display = 'flex';
        
        // Update image after popup is visible
        requestAnimationFrame(() => {
            updatePopupImage();
        });
    }

    // Add click event listeners to product buttons
    produtos.forEach(produto => {
        const button = produto.querySelector('.exibir_info_produto');
        button.addEventListener('click', () => {
            showPopup(produto);
        });
    });

    // Close popup when clicking the close button
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Close popup when clicking outside the content
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.style.display = 'none';
        }
    });

    // Previous image button
    prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentImages.length > 1) {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentImages.length - 1;
            updatePopupImage();
        }
    });

    // Next image button
    nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentImages.length > 1) {
            currentIndex = (currentIndex < currentImages.length - 1) ? currentIndex + 1 : 0;
            updatePopupImage();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (popup.style.display === 'flex') {
            if (e.key === 'Escape') {
                popup.style.display = 'none';
            } else if (e.key === 'ArrowLeft' && currentImages.length > 1) {
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : currentImages.length - 1;
                updatePopupImage();
            } else if (e.key === 'ArrowRight' && currentImages.length > 1) {
                currentIndex = (currentIndex < currentImages.length - 1) ? currentIndex + 1 : 0;
                updatePopupImage();
            }
        }
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (popup.style.display === 'flex') {
            updatePopupImage();
        }
    });
});