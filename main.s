# Dean Cohen 322537952


# The AT&T syntax: operation src, dest

# The "imports"
.extern printf
.extern scanf
.extern srand
.extern rand

# The "global" variables
.section .data
user_seed:
    .long 0
user_guess:
    .long 0
rand_result:
    .long 0

# The "const" variables section
.section .rodata
scanf_seed_fmt:
    .string "%d"
scanf_guess_fmt:
    .string "%d"
user_seed_msg:
    .string "Enter configuration seed: "
user_guess_msg:
    .string "What is your guess? "
incorrect_guess_msg:
    .string "Incorrect.\n"
correct_guess_msg:
    .string "Congratz! You won!\n"
user_lost_msg:
    .string "Game over, you lost :(. The correct answer was %d\n"

.section .text
.global main
.type main, @function
main:
# The game logic goes here, inside the main function.
# Enter
    pushq %rbp
    movq %rsp, %rbp  
# Asking the seed value from the user:
    movq $user_seed_msg, %rdi  # Moves the message to the rdi register (first argument)
    xorq %rax, %rax            # Clear rax
    call printf                # Call printf

# Stores the seed value
    movq $scanf_seed_fmt, %rdi # Store the user_seed value in rdi
    movq $user_seed, %rsi      # Storing the seed via the address
    xorq %rax, %rax            # Clear rax for the scanf operation
    call scanf                 # Call scanf

# Sends the seed to srand
    movq user_seed(%rip), %rdi # Loads the value in user_seed to rdi
    call srand

    # Call rand to generate a random number
    call rand

# Calculates the random number between 1 to 10
    xor %rcx, %rcx              # Clear rcx
    mov $10, %rcx               # Set the upper limit to 10 as N=10
    xor %rdx, %rdx              # Clear rdx for division
    mov %rax, %rax              # Copy the previous result to rax
    div %rcx                    # Divide %edx:eax by %ecx, result in %eax, remainder in %edx

    # Save the remainder in rand_result
    mov %rdx, (rand_result)       # Now rand_result stores the random number between 0-9

    xor %rcx, %rcx             # Clear rcx
    xor %rbx, %rbx             # Clear rbx
    mov $5, %rcx               # Maximum number of guesses is M=5
    mov $0, %rbx               # Initialize the guesses counter
# A label for the guesses loop
.guesses_loop:
# The variables of the loop that runs 5 times and gets the user guess each time

    # Asking the user to enter his guess
    movq $user_guess_msg, %rdi # Moves the message to the rdi register (first argument)
    xorq %rax, %rax            # Clear rax
    call printf                # Call printf

    # Stores the guess value
    movq $scanf_guess_fmt, %rdi # Store the user_guess value in rdi
    movq $user_guess, %rsi      # Storing the guess via the address
    xorq %rax, %rax             # Clear the rax before the scanf operation
    call scanf                  # Call scanf operation



    # Check if the user's guess is correct
    cmpq %rsi, (rand_result)    # Compares the user's guess with the correct number (the one from the rand)
    je .correct_guess             # Jump to correct_guess label if equals

    # If the guess is incorrect guess
    movq $incorrect_guess_msg, %rdi    # The message to print indicating the guess was incorrect
    xorq %rax, %rax                    # Clear rax
    call printf                        # Call printf

    # Handling the loop variables.
    inc %rbx                 # Increments rbx (=the guesses counter) by 1.
    xorq %rcx, %rcx          # Clear rcx
    mov $5, %rcx             # Sets rcx to be 5
    cmpq %rbx, %rcx           # Compares between the guesses counter and the maximum number of guesses allowed.
    je .game_over            # Jumps to game_over if maximum guesses (=5) reached
    jmp .guesses_loop          # Jump back to guesses_loop for another attempt


# The label for a correct guess
.correct_guess:
    # If the guess was correct
    movq $correct_guess_msg, %rdi      # Message to print
    xorq %rax, %rax                    # Clear rax
    call printf                        # Call printf
    # We can Now close the program
    jmp .exit_program                  # Jump to exit_program

# The game over label responsible for M=5 incorrect guesses
.game_over:
    # The user reached the max amount of guesses
    leaq user_lost_msg(%rip), %rdi     # using leaq to store the message in rdi
    movq (rand_result), %rsi           # Moves the random number to rsi
    xorq %rax, %rax                    # Clear rax
    call printf                        # Call printf

.exit_program:
# Exit
    xorq %rax, %rax
    movq %rbp, %rsp
    popq %rbp
    ret
