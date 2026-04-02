document.addEventListener('DOMContentLoaded', function() {
    const terminalContent = document.querySelector('.terminal-content');
    const commands = [
        { text: 'sudo initialize portfolio.exe', type: 'command' },
        { text: 'Initialisation système...', type: 'output', delay: 500 },
        { text: 'Chargement profil développeur...', type: 'output', delay: 1000 },
        { text: 'Compilation des compétences...', type: 'output', delay: 1500 },
        { text: '████████████████████████ 100%', type: 'output', delay: 2000 },
        { text: 'Accès autorisé !', type: 'output', delay: 2500, isLast: true }
    ];

    const mainTitle = "Vous recherchez un étudiant en informatique ?";
    const subTitles = [
        "Étudiant en BUT Réseaux & Télécommunications",
        "Passionné par la programmation et les nouvelles technologies",
        "Spécialisé en configuration réseau, cybersécurité et développement web"
    ];

    let currentLine = 0;
    let currentChar = 0;

    function typeCharacter() {
        if (currentLine >= commands.length) {
            if (commands[currentLine - 1].isLast) {
                setTimeout(() => {
                    typeMainTitle();
                    setTimeout(completeTerminal, 8000); // Attendre que le titre et les sous-titres soient tapés
                }, 1000);
            }
            return;
        }

        const command = commands[currentLine];
        if (!document.querySelector(`[data-line="${currentLine}"]`)) {
            const lineDiv = document.createElement('div');
            lineDiv.className = `line ${command.type}`;
            lineDiv.setAttribute('data-line', currentLine);

            if (command.type === 'command') {
                lineDiv.innerHTML = '<span class="prompt">$</span> <span class="command-text"></span>';
            } else {
                lineDiv.innerHTML = '<span class="output-text"></span>';
            }

            terminalContent.appendChild(lineDiv);
        }

        const textElement = document.querySelector(`[data-line="${currentLine}"] .${command.type === 'command' ? 'command-text' : 'output-text'}`);

        if (currentChar < command.text.length) {
            textElement.textContent += command.text[currentChar];
            currentChar++;
            setTimeout(typeCharacter, command.type === 'command' ? 50 : 0);
        } else {
            currentChar = 0;
            currentLine++;
            setTimeout(typeCharacter, command.delay || 0);
        }
    }

    function typeMainTitle() {
        const titleDiv = document.createElement('div');
        titleDiv.className = 'main-title typing-main';
        terminalContent.appendChild(titleDiv);

        let currentChar = 0;
        function typeTitle() {
            if (currentChar < mainTitle.length) {
                titleDiv.textContent += mainTitle[currentChar];
                currentChar++;
                setTimeout(typeTitle, 50);
            } else {
                typeSubTitles();
            }
        }
        typeTitle();
    }

    function typeSubTitles() {
        const subTitlesDiv = document.createElement('div');
        subTitlesDiv.className = 'sub-titles';
        terminalContent.appendChild(subTitlesDiv);

        let currentSubTitle = 0;

        function typeSubTitle() {
            if (currentSubTitle >= subTitles.length) {
                // Ajouter le curseur clignotant à la fin
                const cursor = document.createElement('div');
                cursor.className = 'terminal-cursor';
                cursor.textContent = '_';
                subTitlesDiv.appendChild(cursor);
                return;
            }

            const p = document.createElement('p');
            p.className = 'typing-sub';
            subTitlesDiv.appendChild(p);

            let currentChar = 0;
            function typeChar() {
                if (currentChar < subTitles[currentSubTitle].length) {
                    p.textContent += subTitles[currentSubTitle][currentChar];
                    currentChar++;
                    setTimeout(typeChar, 30);
                } else {
                    currentSubTitle++;
                    setTimeout(typeSubTitle, 500);
                }
            }
            typeChar();
        }

        typeSubTitle();
    }

    function completeTerminal() {
        const contentSections = document.querySelectorAll('.content-section');

        // Scroll vers la section "À propos" sans masquer le terminal
        setTimeout(() => {
            const aboutSection = document.querySelector('#about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }

            // Afficher progressivement les sections
            contentSections.forEach((section, index) => {
                setTimeout(() => {
                    section.classList.add('visible');
                }, 300 * (index + 1));
            });
        }, 1000);
    }

    // Configuration des événements de scroll
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('.section');
        const threshold = window.innerHeight * 0.8;

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            if (sectionTop < threshold) {
                section.classList.add('visible');
            }
        });
    });

    // Démarrer l'animation du terminal
    setTimeout(typeCharacter, 1000);
});
