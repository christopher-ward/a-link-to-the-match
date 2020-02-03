# A Link to the Match

> - Maintained by: `christopher-ward`

## What is this app about?
<details>
<summary> &#8592; Click arrow for details</summary>

1. A Link to the Match is a matching game in which a player attempts to match the images contained on "playing cards".
2. There are a total of 18 cards:
    - Each card contains 1 of 9 images
    - There are two of each image allowing for 9 total matches
3. The following stats are tracked:
    - Total number of games played
    - Total number of matches for the current game
    - The accuracy of the players attempts to match the cards in relation to the current game (as a percentage)
4. The cards are displayed face down and "flip" over when they are clicked.
5. Two cards can be flipped each round.
6. If the images of the two cards which are flipped over match:
    - The player's accuracy is updated
7. If the two flipped over cards do not match:
    - The cards are flipped back over
    - 1 is added to the total number of attempts
    - The players accuracy is updated
    - The player continues to search for matching pairs
8. After each turn, stats are displayed, including:
    - The total number of matches made
    - The accuracy calculated from the total number of matches and total number of attempts
9. Once all 9 cards have been matched:
    - A modal is shown to the player telling them they have won.
    - A button is provided which can reset the game by clicking on it.
10. Resetting the game performs the following actions:
    - All cards are flipped back over
    - The number of games played is increased
    - The total number of matches are reset
    - The accuracy percentage is reset to 0%
11. For a bonus challenge in the initial build
    - Create the cards dynamically
    - Shuffle the cards every time the game is reset
    - DO NOT PERFORM THIS PRIOR TO THE COMPLETION OF MVP
        - The "boss" will not be happy...
</details>

### Bonus Feature / Challenge
- Shuffling cards
- Dynamically creating cards
