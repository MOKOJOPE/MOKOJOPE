document.addEventListener('DOMContentLoaded', function() {
    const facts = {
        cat: "Cats have five toes on their front paws, but only four toes on their back paws.",
        dog: "Dogs' sense of smell is about 100,000 times stronger than humans'.",
        mouse: "Mice have facial expressions which communicate their mood to others.",
        hamster: "All domesticated Syrian hamsters are descendants of two hamsters that were bred in 1930.",
        rabbit: "Rabbits are very social creatures that live in groups. They live in warrens — a series of tunnels and rooms that they dig underground.",
        bear: "Bears are bowlegged. This gives them better grip and balance.",
        panda: "A panda's average life span is 20-25 years in the wild and up to 30 in captivity.",
        fox: "Foxes are canines, meaning they are related to dogs, wolves, and coyotes.",
        // Add more facts as needed
    };
    

    const animalCards = document.querySelectorAll('.animal-card');
    const factText = document.getElementById('factText');

    animalCards.forEach(card => {
        card.addEventListener('click', function() {
            const animal = this.getAttribute('data-animal');
            factText.textContent = facts[animal] || "No fact available for this animal.";
        });
    });
});
