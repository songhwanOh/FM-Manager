// script.js
document.addEventListener("DOMContentLoaded", function () {

    const main = document.querySelector("main"); // Get a reference to the <main> element 
    const reviewData = window.reviewData; // Get review data from the window object
  
    // generate a review card HTML element
    function generateReviewCard(review) {
        const card = document.createElement("div");
        card.classList.add("review-card");
        card.innerHTML = `
          <h3>${review.name}</h3>
          <p>Date: ${review.date}</p>
          <div class="rating">${generateRatingStars(review.rating)}</div>
          <p>${review.review}</p>
        `;
        return card;
      }
      
      // generate rating stars using Unicode characters
    function generateRatingStars(rating) {
      const fullStars = "★".repeat(rating);
      const emptyStars = "☆".repeat(5 - rating);
      return `${fullStars}${emptyStars}`;
    }
  
    // display a review card
    function showReviewCard(review) {
        const newReviewContainer = document.getElementById("newReviewContainer");
        const reviewCard = generateReviewCard(review);
        newReviewContainer.insertAdjacentElement("beforebegin", reviewCard);
      }
      
    // remove the currently displayed review card
    function removeCurrentReviewCard() {
        const currentReviewCard = document.querySelector(".review-card");
        if (currentReviewCard) {
            currentReviewCard.remove();
        }
    }
    
    // clear all review cards
    function clearReviewCards() {
        main.querySelectorAll(".review-card").forEach((card) => card.remove());
    }
  
    // generate review links in the sidebar
    function generateReviewLinks() {
        const reviewLinksWrapper = document.getElementById("reviewLinks");
        const reviewsList = document.createElement("ul");
        for (let i = 0; i < reviewData.length; i++) {
          const review = reviewData[i];
          const reviewName = review.name.trim(); // Trim leading/trailing whitespace
          const listItem = document.createElement("li");
          listItem.textContent = `${reviewName}'s Review`;
          listItem.setAttribute("data-index", i);
          reviewsList.appendChild(listItem);
        }
        reviewLinksWrapper.innerHTML = ""; // Clear previous review links
        reviewLinksWrapper.appendChild(reviewsList); // Append the updated review links
    }
      
    // handle clicking on a review link
    function handleClick(event) {
        const reviewIndex = event.target.getAttribute("data-index");
        if (reviewIndex !== null) {
          const index = parseInt(reviewIndex);
          const review = reviewData[index];
          removeCurrentReviewCard();
          showReviewCard(review);
        }
    }
      
  // show the first review card when the page loads
    function showFirstReviewCard() {
        const firstReview = reviewData[0];
        showReviewCard(firstReview);
        generateReviewLinks(); // Generate the review links after showing the first review
    }
      
    // Generate initial review links and show the first review card
    generateReviewLinks();
    showFirstReviewCard();
  
    // Event listener for clicks on the main content area
    main.addEventListener("click", handleClick);

    const newReviewForm = document.getElementById("newReviewForm");

    // Event listener for submitting the new review form
    newReviewForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const date = document.getElementById("date").value;
        const rating = parseInt(document.getElementById("rating").value);
        const review = document.getElementById("review").value.trim();

        if (name && review) {
          
          // Create a new review object
          const newReview = { name, date, rating, review };
          
          // Add the new review to the reviewData array
          reviewData.push(newReview);
          
          // Clear the existing review cards
          clearReviewCards();
          
          // Generate the updated review cards
          generateReviewLinks();
          showReviewCard(newReview);
          
          // Reset the form inputs
          newReviewForm.reset();
        }
    });
});
  