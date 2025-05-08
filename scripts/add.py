import requests
import json
import time

# Server URL (change if needed)
SERVER_URL = "http://localhost:5000/questions"

# Hardcoded list of 100 questions
questions = [
    {"question": "What is the capital of France?", "options": ["London", "Paris", "Berlin", "Rome"], "answer": 1, "tags": ["geography", "europe"]},
    {"question": "What is the highest mountain in the world?", "options": ["K2", "Kangchenjunga", "Mount Everest", "Lhotse"], "answer": 2, "tags": ["geography", "mountains"]},
    {"question": "What is the chemical symbol for water?", "options": ["Wo", "Wa", "H2O", "HO2"], "answer": 2, "tags": ["science", "chemistry"]},
    {"question": "Who painted the Mona Lisa?", "options": ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"], "answer": 1, "tags": ["art", "painting"]},
    {"question": "What is the largest planet in our solar system?", "options": ["Mars", "Earth", "Jupiter", "Saturn"], "answer": 2, "tags": ["science", "astronomy"]},
    {"question": "What is the smallest country in the world?", "options": ["Monaco", "Nauru", "Vatican City", "San Marino"], "answer": 2, "tags": ["geography", "europe"]},
    {"question": "Who wrote 'Hamlet'?", "options": ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"], "answer": 1, "tags": ["literature", "drama"]},
    {"question": "What is the currency of Japan?", "options": ["Yuan", "Won", "Yen", "Ringgit"], "answer": 2, "tags": ["geography", "economics"]},
    {"question": "What is the speed of light?", "options": ["300,000 km/s", "200,000 km/s", "400,000 km/s", "500,000 km/s"], "answer": 0, "tags": ["science", "physics"]},
    {"question": "Who developed the theory of relativity?", "options": ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Galileo Galilei"], "answer": 1, "tags": ["science", "physics"]},
    {"question": "What is the capital of Spain?", "options": ["Lisbon", "Barcelona", "Madrid", "Seville"], "answer": 2, "tags": ["geography", "europe"]},
    {"question": "What is the longest river in the world?", "options": ["Nile", "Amazon", "Yangtze", "Mississippi"], "answer": 0, "tags": ["geography", "rivers"]},
    {"question": "What is the chemical symbol for gold?", "options": ["Au", "Ag", "Fe", "Cu"], "answer": 0, "tags": ["science", "chemistry"]},
    {"question": "Who painted 'Starry Night'?", "options": ["Pablo Picasso", "Vincent van Gogh", "Claude Monet", "Salvador Dalí"], "answer": 1, "tags": ["art", "painting"]},
    {"question": "What is the largest moon of Saturn?", "options": ["Europa", "Titan", "Ganymede", "Callisto"], "answer": 1, "tags": ["science", "astronomy"]},
    {"question": "What is the smallest planet in our solar system?", "options": ["Mars", "Mercury", "Venus", "Earth"], "answer": 1, "tags": ["science", "astronomy"]},
    {"question": "Who wrote 'Pride and Prejudice'?", "options": ["Jane Austen", "Emily Bronte", "Charlotte Bronte", "Louisa May Alcott"], "answer": 0, "tags": ["literature", "romance"]},
    {"question": "What is the currency of China?", "options": ["Yen", "Won", "Yuan", "Ringgit"], "answer": 2, "tags": ["geography", "economics"]},
    {"question": "What is the value of pi (π) to two decimal places?", "options": ["3.14", "3.16", "3.12", "3.18"], "answer": 0, "tags": ["science", "mathematics"]},
    {"question": "Who discovered penicillin?", "options": ["Marie Curie", "Alexander Fleming", "Louis Pasteur", "Robert Koch"], "answer": 1, "tags": ["science", "biology"]},
    {"question": "What is the capital of Italy?", "options": ["Venice", "Milan", "Rome", "Naples"], "answer": 2, "tags": ["geography", "europe"]},
    {"question": "What is the largest ocean on Earth?", "options": ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], "answer": 3, "tags": ["geography", "oceans"]},
    {"question": "What is the chemical symbol for oxygen?", "options": ["Ox", "O2", "Og", "On"], "answer": 1, "tags": ["science", "chemistry"]},
    {"question": "Who sculpted David?", "options": ["Donatello", "Michelangelo", "Raphael", "Bernini"], "answer": 1, "tags": ["art", "sculpture"]},
    {"question": "What is the closest star to Earth?", "options": ["Sirius", "Alpha Centauri", "Proxima Centauri", "Betelgeuse"], "answer": 2, "tags": ["science", "astronomy"]},
    {"question": "What is the name of the first man to walk on the moon?", "options": ["Buzz Aldrin", "Neil Armstrong", "Yuri Gagarin", "Alan Shepard"], "answer": 1, "tags": ["science", "space"]},
    {"question": "Who wrote 'Jane Eyre'?", "options": ["Jane Austen", "Emily Bronte", "Charlotte Bronte", "Louisa May Alcott"], "answer": 2, "tags": ["literature", "romance"]},
    {"question": "What is the currency of South Korea?", "options": ["Yen", "Won", "Yuan", "Ringgit"], "answer": 1, "tags": ["geography", "economics"]},
    {"question": "What is the formula for the area of a circle?", "options": ["πr²", "2πr", "πd", "πr"], "answer": 0, "tags": ["science", "mathematics"]},
    {"question": "Who developed the polio vaccine?", "options": ["Jonas Salk", "Albert Sabin", "Edward Jenner", "Robert Koch"], "answer": 0, "tags": ["science", "biology"]},
    {"question": "What is the capital of Canada?", "options": ["Toronto", "Montreal", "Vancouver", "Ottawa"], "answer": 3, "tags": ["geography", "north_america"]},
    {"question": "What is the largest desert in the world?", "options": ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Antarctic Desert"], "answer": 3, "tags": ["geography", "deserts"]},
    {"question": "What is the chemical symbol for carbon?", "options": ["Ca", "Co", "C", "Cr"], "answer": 2, "tags": ["science", "chemistry"]},
    {"question": "Who painted 'The Scream'?", "options": ["Edvard Munch", "Pablo Picasso", "Vincent van Gogh", "Claude Monet"], "answer": 0, "tags": ["art", "painting"]},
    {"question": "What is the largest moon of Neptune?", "options": ["Triton", "Oberon", "Umbriel", "Ariel"], "answer": 0, "tags": ["science", "astronomy"]},
    {"question": "What is the hottest planet in our solar system?", "options": ["Mars", "Mercury", "Venus", "Earth"], "answer": 2, "tags": ["science", "astronomy"]},
    {"question": "Who wrote 'The Great Gatsby'?", "options": ["Ernest Hemingway", "F. Scott Fitzgerald", "Mark Twain", "Herman Melville"], "answer": 1, "tags": ["literature", "fiction"]},
    {"question": "What is the currency of Brazil?", "options": ["Peso", "Real", "Dollar", "Euro"], "answer": 1, "tags": ["geography", "economics"]},
    {"question": "What is the Pythagorean theorem?", "options": ["a² + b² = c²", "a² + c² = b²", "b² + c² = a²", "a + b = c"], "answer": 0, "tags": ["science", "mathematics"]},
    {"question": "Who discovered X-rays?", "options": ["Marie Curie", "Wilhelm Röntgen", "Louis Pasteur", "Albert Einstein"], "answer": 1, "tags": ["science", "physics"]},
    {"question": "What is the capital of Australia?", "options": ["Sydney", "Melbourne", "Canberra", "Perth"], "answer": 2, "tags": ["geography", "australia"]},
    {"question": "What is the largest coral reef system in the world?", "options": ["Great Barrier Reef", "Belize Barrier Reef", "Red Sea Coral Reef", "Florida Reef"], "answer": 0, "tags": ["geography", "marine"]},
    {"question": "What is the chemical symbol for nitrogen?", "options": ["N", "Ni", "No", "Na"], "answer": 0, "tags": ["science", "chemistry"]},
    {"question": "Who painted 'Guernica'?", "options": ["Pablo Picasso", "Salvador Dalí", "Joan Miró", "Francisco Goya"], "answer": 0, "tags": ["art", "painting"]},
    {"question": "What is the largest volcano in our solar system?", "options": ["Olympus Mons", "Mauna Loa", "Mount Vesuvius", "Mount Etna"], "answer": 0, "tags": ["science", "astronomy"]},
    {"question": "What is the name of the first woman to fly in space?", "options": ["Valentina Tereshkova", "Sally Ride", "Judith Resnik", "Mae Jemison"], "answer": 0, "tags": ["science", "space"]},
    {"question": "Who wrote 'To Kill a Mockingbird'?", "options": ["Harper Lee", "Mark Twain", "Ernest Hemingway", "William Faulkner"], "answer": 0, "tags": ["literature", "fiction"]},
    {"question": "What is the currency of India?", "options": ["Yuan", "Rupee", "Ringgit", "Won"], "answer": 1, "tags": ["geography", "economics"]},
    {"question": "What is the formula for the circumference of a circle?", "options": ["πr²", "2πr", "πd", "πr"], "answer": 2, "tags": ["science", "mathematics"]},
    {"question": "Who developed the theory of evolution by natural selection?", "options": ["Charles Darwin", "Gregor Mendel", "James Watson", "Francis Crick"], "answer": 0, "tags": ["science", "biology"]},
    {"question": "What is the capital of Argentina?", "options": ["Rio de Janeiro", "Buenos Aires", "Santiago", "Lima"], "answer": 1, "tags": ["geography", "south_america"]},
    {"question": "What is the largest waterfall in the world?", "options": ["Angel Falls", "Victoria Falls", "Niagara Falls", "Iguazu Falls"], "answer": 0, "tags": ["geography", "waterfalls"]},
    {"question": "What is the chemical symbol for potassium?", "options": ["Po", "K", "P", "Pt"], "answer": 1, "tags": ["science", "chemistry"]},
    {"question": "Who sculpted 'The Thinker'?", "options": ["Auguste Rodin", "Henry Moore", "Constantin Brâncuși", "Edgar Degas"], "answer": 0, "tags": ["art", "sculpture"]},
    {"question": "What is the largest star in our solar system?", "options": ["Sirius", "The Sun", "Betelgeuse", "Vega"], "answer": 1, "tags": ["science", "astronomy"]},
    {"question": "What is the name of the first woman to serve on the U.S. Supreme Court?", "options": ["Sandra Day O'Connor", "Ruth Bader Ginsburg", "Sonia Sotomayor", "Elena Kagan"], "answer": 0, "tags": ["history", "law"]},
    {"question": "Who wrote '1984'?", "options": ["George Orwell", "Aldous Huxley", "Ray Bradbury", "Kurt Vonnegut"], "answer": 0, "tags": ["literature", "dystopian"]},
    {"question": "What is the currency of Mexico?", "options": ["Peso", "Real", "Dollar", "Euro"], "answer": 0, "tags": ["geography", "economics"]},
    {"question": "What is the formula for the volume of a sphere?", "options": ["4/3πr³", "πr²h", "πr³", "2πr²"], "answer": 0, "tags": ["science", "mathematics"]},
    {"question": "Who developed the theory of quantum mechanics?", "options": ["Niels Bohr", "Erwin Schrödinger", "Werner Heisenberg", "Max Planck"], "answer": 0, "tags": ["science", "physics"]},
    {"question": "What is the capital of Russia?", "options": ["Kiev", "Minsk", "Moscow", "St. Petersburg"], "answer": 2, "tags": ["geography", "europe"]},
    {"question": "What is the deepest point in the ocean?", "options": ["Puerto Rico Trench", "Mariana Trench", "Java Trench", "Kurile–Kamchatka Trench"], "answer": 1, "tags": ["geography", "oceans"]},
    {"question": "What is the chemical symbol for sodium?", "options": ["So", "Na", "Sa", "Si"], "answer": 1, "tags": ["science", "chemistry"]},
    {"question": "Who painted 'The Birth of Venus'?", "options": ["Sandro Botticelli", "Titian", "Caravaggio", "Raphael"], "answer": 0, "tags": ["art", "painting"]},
    {"question": "What is the largest known asteroid?", "options": ["Ceres", "Vesta", "Pallas", "Hygeia"], "answer": 0, "tags": ["science", "astronomy"]},
    {"question": "What is the name of the first African American to play Major League Baseball?", "options": ["Jackie Robinson", "Satchel Paige", "Roy Campanella", "Hank Aaron"], "answer": 0, "tags": ["history", "sports"]},
    {"question": "Who wrote 'The Lord of the Rings'?", "options": ["J.R.R. Tolkien", "C.S. Lewis", "George R.R. Martin", "Robert Jordan"], "answer": 0, "tags": ["literature", "fantasy"]},
    {"question": "What is the currency of Nigeria?", "options": ["Rand", "Naira", "Shilling", "Cedi"], "answer": 1, "tags": ["geography", "africa"]},
    {"question": "What is the formula for the area of a triangle?", "options": ["bh/2", "bh", "b+h/2", "2bh"], "answer": 0, "tags": ["science", "mathematics"]},
    {"question": "Who developed the smallpox vaccine?", "options": ["Jonas Salk", "Albert Sabin", "Edward Jenner", "Robert Koch"], "answer": 2, "tags": ["science", "biology"]},
    {"question": "What is the capital of Egypt?", "options": ["Alexandria", "Cairo", "Giza", "Luxor"], "answer": 1, "tags": ["geography", "africa"]},
    {"question": "What is the largest hot desert in Africa?", "options": ["Namib Desert", "Kalahari Desert", "Sahara Desert", "Danakil Desert"], "answer": 2, "tags": ["geography", "deserts"]},
    {"question": "What is the chemical symbol for iron?", "options": ["Ir", "Fe", "Io", "In"], "answer": 1, "tags": ["science", "chemistry"]},
    {"question": "Who painted 'Water Lilies'?", "options": ["Claude Monet", "Pierre-Auguste Renoir", "Edgar Degas", "Paul Cézanne"], "answer": 0, "tags": ["art", "painting"]},
    {"question": "What is the largest dwarf planet?", "options": ["Pluto", "Eris", "Makemake", "Haumea"], "answer": 1, "tags": ["science", "astronomy"]},
    {"question": "What is the name of the first Hispanic Supreme Court Justice?", "options": ["Sonia Sotomayor", "Alberto Gonzales", "Antonin Scalia", "Ruth Bader Ginsburg"], "answer": 0, "tags": ["history", "law"]},
    {"question": "Who wrote 'The Handmaid's Tale'?", "options": ["Margaret Atwood", "Ursula K. Le Guin", "Octavia Butler", "Sylvia Plath"], "answer": 0, "tags": ["literature", "dystopian"]},
    {"question": "What is the currency of Thailand?", "options": ["Yuan", "Baht", "Ringgit", "Dong"], "answer": 1, "tags": ["geography", "asia"]},
    {"question": "What is the formula for the area of a trapezoid?", "options": ["(a+b)h/2", "bh", "(a+b)h", "ah"], "answer": 0, "tags": ["science", "mathematics"]},
    {"question": "Who discovered insulin?", "options": ["Frederick Banting", "Charles Best", "James Collip", "John Macleod"], "answer": 0, "tags": ["science", "biology"]},
    {"question": "What is the capital of Nigeria?", "options": ["Lagos", "Kano", "Ibadan", "Abuja"], "answer": 3, "tags": ["geography", "africa"]},
    {"question": "What is the largest canyon system on Mars?", "options": ["Valles Marineris", "Canyonlands National Park", "Grand Canyon", "Fish River Canyon"], "answer": 0, "tags": ["geography", "space"]},
    {"question": "What is the chemical symbol for zinc?", "options": ["Zn", "Zi", "Ze", "Zr"], "answer": 0, "tags": ["science", "chemistry"]},
    {"question": "Who painted 'Les Demoiselles d'Avignon'?", "options": ["Henri Matisse", "Pablo Picasso", "Georges Braque", "Edgar Degas"], "answer": 1, "tags": ["art", "painting"]},
    {"question": "What is the largest moon of Uranus?", "options": ["Titania", "Oberon", "Umbriel", "Ariel"], "answer": 0, "tags": ["science", "astronomy"]},
    {"question": "What is the name of the ship that sank in 1912?", "options": ["Britannic", "Olympic", "Titanic", "Lusitania"], "answer": 2, "tags": ["history", "disaster"]},
    {"question": "Who wrote 'The Color Purple'?", "options": ["Toni Morrison", "Alice Walker", "Maya Angelou", "Zora Neale Hurston"], "answer": 1, "tags": ["literature", "fiction"]},
    {"question": "What is the currency of Switzerland?", "options": ["Euro", "Pound", "Franc", "Lira"], "answer": 2, "tags": ["geography", "europe"]},
    {"question": "What is the formula for the area of a parallelogram?", "options": ["bh/2", "bh", "(a+b)h", "ah"], "answer": 1, "tags": ["science", "mathematics"]},
    {"question": "Who is considered the father of modern computer science?", "options": ["Alan Turing", "John von Neumann", "Claude Shannon", "Charles Babbage"], "answer": 0, "tags": ["science", "technology"]},
    {"question": "What is the capital of Chile?", "options": ["Santiago", "Valparaíso", "Concepción", "Antofagasta"], "answer": 0, "tags": ["geography", "south_america"]},
    {"question": "What is the driest desert in the world?", "options": ["Atacama Desert", "Sahara Desert", "Arabian Desert", "Mojave Desert"], "answer": 0, "tags": ["geography", "deserts"]},
    {"question": "What is the chemical symbol for silver?", "options": ["Si", "Ag", "Au", "Al"], "answer": 1, "tags": ["science", "chemistry"]},
    {"question": "Who painted 'The Persistence of Memory'?", "options": ["Salvador Dalí", "Pablo Picasso", "René Magritte", "Joan Miró"], "answer": 0, "tags": ["art", "painting"]},
    {"question": "What is the largest known Kuiper Belt object?", "options": ["Pluto", "Eris", "Makemake", "Haumea"], "answer": 0, "tags": ["science", "astronomy"]},
    {"question": "What was the name of the first woman to be elected Prime Minister of India?", "options": ["Indira Gandhi", "Golda Meir", "Margaret Thatcher", "Benazir Bhutto"], "answer": 0, "tags": ["history", "politics"]},
    {"question": "Who wrote 'One Hundred Years of Solitude'?", "options": ["Gabriel García Márquez", "Jorge Luis Borges", "Isabel Allende", "Julio Cortázar"], "answer": 0, "tags": ["literature", "magical realism"]},
    {"question": "What is the currency of Vietnam?", "options": ["Yuan", "Baht", "Ringgit", "Dong"], "answer": 3, "tags": ["geography", "asia"]},
    {"question": "What is the formula for the volume of a cylinder?", "options": ["πr²h", "2πrh", "πr³", "4/3πr³"], "answer": 0, "tags": ["science", "mathematics"]},
    {"question": "Who discovered the circulation of blood?", "options": ["William Harvey", "Andreas Vesalius", "Galen", "Hippocrates"], "answer": 0, "tags": ["science", "biology"]},
    {"question": "What is the capital of Israel?", "options": ["Tel Aviv", "Jerusalem", "Haifa", "Beer Sheva"], "answer": 1, "tags": ["geography", "middle_east"]},
    {"question": "What is the largest salt flat in the world?", "options": ["Salar de Uyuni", "Bonneville Salt Flats", "Etosha Pan", "Makgadikgadi Pan"], "answer": 0, "tags": ["geography", "salt_flats"]},
    {"question": "What is the chemical symbol for mercury?", "options": ["Hg", "Me", "Mr", "Hy"], "answer": 0, "tags": ["science", "chemistry"]},
    {"question": "Who painted 'Sunflowers'?", "options": ["Vincent van Gogh", "Paul Gauguin", "Claude Monet", "Paul Cézanne"], "answer": 0, "tags": ["art", "painting"]},
    {"question": "What is the largest moon of Jupiter?", "options": ["Europa", "Titan", "Ganymede", "Callisto"], "answer": 2, "tags": ["science", "astronomy"]},
    {"question": "What is the name of the battle that ended Napoleon's rule in 1815?", "options": ["Battle of Trafalgar", "Battle of Austerlitz", "Battle of Waterloo", "Battle of Borodino"], "answer": 2, "tags": ["history", "military"]},
    {"question": "Who wrote 'Moby Dick'?", "options": ["Herman Melville", "Nathaniel Hawthorne", "Edgar Allan Poe", "Ralph Waldo Emerson"], "answer": 0, "tags": ["literature", "fiction"]},
    {"question": "What is the currency of Denmark?", "options": ["Euro", "Krone", "Pound", "Lira"], "answer": 1, "tags": ["geography", "europe"]},
    {"question": "What is the formula for the area of a rhombus?", "options": ["bh/2", "bh", "d1d2/2", "2d1d2"], "answer": 2, "tags": ["science", "mathematics"]},
    {"question": "Who is known as the father of genetics?", "options": ["Charles Darwin", "Gregor Mendel", "James Watson", "Francis Crick"], "answer": 1, "tags": ["science", "biology"]},
    {"question": "What is the capital of Kenya?", "options": ["Nairobi", "Mombasa", "Kisumu", "Nakuru"], "answer": 0, "tags": ["geography", "africa"]},
]


import requests
import json
import time

# Server URL (change if needed)
SERVER_URL = "http://localhost:3000/questions"


if __name__ == "__main__":
    """Main function to add 100 hardcoded questions."""
    for i, question_data in enumerate(questions, 1):
        try:
            response = requests.post(SERVER_URL, json=question_data)
            response.raise_for_status()  # Raise HTTPError for bad responses (4xx or 5xx)
            print(f"Added question {i}")
        except requests.exceptions.RequestException as e:
            print(f"Error adding question {i}: {e}")
        time.sleep(0.05)  # Add a small delay

    print("Successfully added 100 questions to the database.")

