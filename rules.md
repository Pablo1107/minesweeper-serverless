# Gameplay

Minesweeper has a very basic gameplay style. In its original form, mines are
scattered throughout a board. This board is divided into cells, which have
three states: uncovered, covered and flagged. A covered cell is blank and
clickable, while an uncovered cell is exposed, either containing a number (the
mines adjacent to it), or a mine. When a cell is uncovered by a player click,
and if it bears a mine, the game ends. A flagged cell is similar to a covered
one, in the way that mines are not triggered when a cell is flagged, and it is
impossible to lose through the action of flagging a cell. However, flagging a
cell implies that a player thinks there is a mine underneath, which causes the
game to deduct an available mine from the display.

In order to win the game, players must logically deduce where mines exist
through the use of the numbers given by uncovered cells. To win, all non-mine
cells must be uncovered. At this stage, the timer is stopped. Commonly all mine
cells are also flagged, but this is not required.

When a player left-clicks on a cell, the game will uncover it. If there are no
mines adjacent to that particular cell, the mine will display a blank tile or a
"0", and all adjacent cells will automatically be uncovered. Right-clicking on
a cell will flag it, causing a flag to appear on it. Note that flagged cells
are still covered, and a player can click on it to uncover it, like a normal
covered cell. 

 - [X] Create board
   - [ ] Create an array of n x m cells
   - [X] Each cell has three states: uncovered, covered, flagged
     - covered: is blank and clickable
     - uncovered: is exposed, contains a number (mines adjacent to it), or a mine
       - if has a mine and was uncovered by the user, the game ends
       - if all non-mine cells are uncovered, the user wins
     - flagged: similar to covered, the user select it if he thinks it has a mine
       - flaggin a cell that has mine underneath substracts the mine count, when
         the count goes to zero the user wins
   - [X] Left click uncovers a cell
   - [X] Right click flags a cell
