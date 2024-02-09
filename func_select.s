# Dean Cohen 322537952


# The AT&T syntax: operation src, dest

# The "imports"
.extern printf
.extern scanf
.extern pstrlen
.extern swapCase
.extern pstrijcpy



# The rodata section that stores the strings to print.
.section .rodata
invalid_choice_msg:
    .string "invalid option!\n"
choice_31_msg1:
    .string "first pstring length: %hhu, second pstring length: %hhu\n"
choice_33_msg1:
    .string "length: %hhu, string: %s\n"
choice_33_msg2:
    .string "string: %s\n"
choice_34_msg1:
    .string "length: %hhu, string: %s\n"
choice_34_msg2:
    .string "string: %s\n"
invalid_ij_msg:
    .string "invalid input!\n"
ij_scanf_num:
    .string "%d"



.section .text
.global run_func
run_func: 
    # Parameters that will be used:
    # %rdi - choice number - first argument
    # %rsi - pointer to the first Pstring - second argument
    # %rdx - pointer to the second Pstring - third argument
    # Enter - Prologue
    pushq %rbp
    movq %rsp, %rbp 
    pushq %rbx                           # Push rbx as a callee register
    pushq %r14                           # Push r14 as a callee register
    movq  %rsi, %rbx                     # Copy pstring1 to rbx
    movq  %rdx, %r14                     # Copy pstring2 to r14
    # Stack alignment to 16 bytes
    subq $16, %rsp   # Allocate 16 bytes, even if you don't use all of them


    # Checks the choice number, to decide which opeartion to call.
    cmpq $31, %rdi 
    je choice_31

    cmpq $33, %rdi
    je choice_33

    cmpq $34, %rdi
    je choice_34

    # If it didnt jump to any of the operations, it means the choice isnt valid,
    # So I need to print "invalid option!\n"
    movq $invalid_choice_msg, %rdi  # Moves the message to the rdi register (first argument)
    xorq %rax, %rax                 # Clear rax
    call printf                     # Call printf
    jmp .exit_program               # Jump to exit program label and close the program.

# The label for call "pstrlen" operation
choice_31:
    movq %rbx, %rdi                      # Move to pstrlen pstring1
    call pstrlen                         
    movb %al, (%rsp)                     # Save the retrun length from rax into the stack
    
    
    movq %r14, %rdi                      # Move to pstrlen pstring2
    call pstrlen                         
    movzbl %al, %edx                      # Store in edx the length of pstring2
    
    movzbl (%rsp), %esi                   # Store in esi the length of pstring1 from the stack
    
    movq	$choice_31_msg1, %rdi         # Set rdi with the format string
    xorq	%rax, %rax                    # Clear rax
    call	printf	                      

    # FInished this part, jump to exit
    jmp .exit_program                 

# The label for call "swapCase" operation ** IT PRINTS AN EMPTY STRING EVERY TIME **
choice_33:
# choice_33_msg1
    movq    %rbx, %rdi                      # Moves pstring1 to swapCase
    call    swapCase                        
    
    movq    %r14, %rdi                      # Moves pstring2 to swapCase
    call    swapCase                        
    
    movq    %rbx, %rdi                      # Moves pstring1 to pstrlen
    call    pstrlen                         
    
    movq	$choice_33_msg1, %rdi           # Moves the message to print to rdi
    movzbl  %al, %esi                       # Moves the length of pstring1 to esi
    leaq    1(%rbx), %rdx                   # Moves to printf pstring1 after the length
    xorq	%rax, %rax                      
    call	printf	                        

    movq    %r14, %rdi                      # Moves pstring2 to pstrlen
    call    pstrlen                         
    
    movq	$choice_33_msg1, %rdi           # Moves the message to print to rdi
    movzbl  %al, %esi                       # Moves the length of pstring2 to esi
    leaq    1(%r14), %rdx                   # Moves to printf pstring2 after the length
    xorq	%rax, %rax                      
    call	printf	                        
    jmp .exit_program
   
# The label for call "pstrijcpy" operation
choice_34:
    # First scant call (i)
    movq $ij_scanf_num, %rdi                # Move the ij scanf format into rdi
    xorq %rax, %rax                         # Clear rax
    movq %rsp, %rsi
    call scanf
    # Second scanf call (j)
    movq $ij_scanf_num, %rdi                # Move the ij scanf format into rdi
    xorq %rax, %rax                         # Clear rax
    leaq 4(%rsp), %rsi
    call scanf

    movq %rbx, %rdi                         # Moves Pstring1 into rdi
    movq %r14, %rsi                         # Moves Pstring2 into rsi
    movb (%rsp), %dl                        # Moves i from the stack to dl
    movb 4(%rsp), %cl                       # Moves j from the stack to cl

  # Checks for valid input of i,j
  cmpb %dl, (%rbx)           # Checks i >= len(pstring1)
  jbe  .invalidij
  cmpb %dl, (%r14)           # Checks i >= len(pstring2)
  jbe  .invalidij
  cmpb %cl, (%rbx)           # Checks j >= len(pstring1)    HERE IT JUMPS TO THE INVALID LABEL
  jbe  .invalidij
  cmpb %cl, (%r14)           # Checks j >= len(pstring2)
  jb  .invalidij
  cmpq $0, %rdx               # Checks i < 0
  jl  .invalidij
  cmpq $0, %rcx             # Checks j < 0
  jl  .invalidij
  cmpb %dl, %cl           # Checks if i>j
  jb   .invalidij


    xorq %rax, %rax
    call pstrijcpy
    movq %rbx, %rdi                         # Moves Pstring1 into rdi
    call pstrlen
    movzbl %al, %esi                        # Moves the length of pstring1 into the esi
    movq $choice_34_msg1, %rdi              # Moves the msg format into rdi
    leaq 1(%rbx), %rdx                      # Moves Pstring1 (without the the size char) into rdx
    xorq %rax, %rax                         # Clear rax
    call printf

    movq %r14, %rdi                         # Moves Pstring2 into rdi
    xorq %rax, %rax
    call pstrlen
    movzbl %al, %esi                        # Moves the length of pstring2 into esi
    movq $choice_34_msg1, %rdi              # Moves the msg format into rdi
    leaq 1(%r14), %rdx                      # Moves pstring2 (without the size char) into rdx
    xorq %rax, %rax
    call printf
    # Finished this part, jump to exit.
    jmp .exit_program



# The input of i,j is invalid
.invalidij:
  leaq invalid_ij_msg(%rip), %rdi
  xorq %rax, %rax
  call printf
  call pstrlen
    movzbl (%rbx), %esi                     # Moves the length of pstring1 into the esi
    movq $choice_34_msg1, %rdi              # Moves the msg format into rdi
    leaq 1(%rbx), %rdx                      # Moves Pstring1 (without the the size char) into rdx
    xorq %rax, %rax                         # Clear rax
    call printf

    movq %r14, %rdi                         # Moves Pstring2 into rdi
    xorq %rax, %rax
    call pstrlen
    movzbl %al, %esi                        # Moves the length of pstring2 into esi
    movq $choice_34_msg1, %rdi              # Moves the msg format into rdi
    leaq 1(%r14), %rdx                      # Moves pstring2 (without the size char) into rdx
    xorq %rax, %rax
    call printf

.exit_program:
    # Exit - The Epilogue
    addq $16, %rsp   # Adjust stack pointer before returning
    popq %r14
    popq %rbx
    movq %rbp, %rsp
    popq %rbp
    ret	                                
