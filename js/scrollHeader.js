document.addEventListener("DOMContentLoaded", function () {
    let lastScrollTop = 0;  // Variável para armazenar a última posição do scroll
    const header = document.querySelector('.body_header');  // Seleciona o header

    window.addEventListener("scroll", function () {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;  // Pega a posição do scroll

        // Se o usuário rolou para baixo e passou de 100px
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Adiciona a classe 'hidden' para esconder o header
            if (!header.classList.contains('hidden')) {
                header.classList.add('hidden');
            }
        } else if (scrollTop < lastScrollTop) {
            // Remove a classe 'hidden' para mostrar o header
            if (header.classList.contains('hidden')) {
                header.classList.remove('hidden');
            }
        }

        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;  // Atualiza a última posição do scroll
    });
});
