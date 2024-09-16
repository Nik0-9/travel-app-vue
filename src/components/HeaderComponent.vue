<template>
    <header>
        <nav class="navbar">
            <ul class="d-flex align-items-center">
                <li class="me-5">
                    <router-link to="/" exact-active-class="active">Home</router-link>
                </li>
                <li>
                    <router-link to="/new-trip" exact-active-class="active">New Trip</router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>

<script>
export default {
    name: 'HeaderComponent',
}
</script>

<style lang="scss" scoped>
header {
    background-color: #2c3e50; // Colore scuro per lo sfondo dell'header
    padding: 10px 0; // Spaziatura verticale per l'header
}

.navbar {
    max-width: 1200px; // Limita la larghezza del contenuto del navbar
    margin: 0 auto; // Centra il contenuto del navbar
    display: flex;
    justify-content: flex-start;
}

ul {
    display: flex;
    padding: 0;
    margin: 0;
}

li {
    list-style: none;
    margin-right: 20px;

    &:last-child {
        margin-right: 0;
    }
}

a {
    text-decoration: none;
    color: #ecf0f1; // Colore chiaro per il testo dei link
    font-size: 1.2rem;
    padding: 10px 15px;
    border-radius: 5px;
    transition: background-color 0.3s ease;

    &:hover {
        background-color: #34495e; // Colore di sfondo al passaggio del mouse
    }
}

.active {
    background-color: #e74c3c; // Colore di sfondo per il link attivo
    color: white;
}

</style>
