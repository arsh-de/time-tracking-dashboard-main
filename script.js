const cards = document.querySelectorAll(".card");
const links = document.querySelectorAll("a");

fetch("data.json")
    .then((response) => response.json())
    .then((data) => {
        cards.forEach((card, index) => {
            if (data[index]) { // Check if data exists for this index
                const title = card.querySelector(".title");
                const current = card.querySelector(".current-hours");
                const previous = card.querySelector(".previous-hours");

                if (title && current && previous) { // Ensure elements exist
                    title.textContent = data[index].title;
                    current.textContent = data[index].timeframes.weekly.current + "hrs"; // Load weekly data
                    previous.textContent = "Last week - " + data[index].timeframes.weekly.previous + "hrs"; // Load previous weekly data
                }
            }
        });

        // Set up event listeners for links
        links.forEach((link) => {
            link.addEventListener("click", (e) => {
                e.preventDefault(); // Prevent the default link behavior

                const timeframe = link.getAttribute("data-timeframe");

                cards.forEach((card, index) => {
                    const current = card.querySelector(".current-hours");
                    const previous = card.querySelector(".previous-hours");

                    if (data[index].timeframes[timeframe]) { // Check if timeframe data exists
                        current.textContent = data[index].timeframes[timeframe].current + "hrs";
                        const reducedName = timeframe.replace(/ly$/i, "");
                        const goodName = reducedName.replace(/i/i, "y");
                        previous.textContent = "Last " + goodName + " - " + data[index].timeframes[timeframe].previous + "hrs";
                    }
                });
            });
        });
    })
    .catch((error) => console.error(error));
