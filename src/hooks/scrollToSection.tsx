export function scrollToSection(id: string, setIsMenuOpen: (open: boolean) => void) {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
};