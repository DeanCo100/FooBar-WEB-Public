# Dean Cohen 322537952

.extern printf


.section .text
.globl pstrlen
        .type pstrlen, @function
pstrlen:
    # Parameters:
    # rdi - the pointer to the pstring
    # Enter - Prologue
   pushq %rbp
   movq %rsp, %rbp  

    movb (%rdi), %al        # Loads the length byte from the pstring to al
    # Epilogue
      movq %rbp, %rsp
      popq %rbp
    ret                     # Return the length value
    jmp .exit_program

.globl swapCase
	      .type	swapCase, @function	                
swapCase:	 
    # Parameters:
    # rdi - the pointer to the pstring.  
    # Enter - Prologue
    pushq %rbp
    movq %rsp, %rbp                                 
    xorq %rax, %rax                       # Clear rax
    movb (%rdi), %al                      # Extract the first byte of the pstring (AKA the length byte)

  .loop: # Enters the loop
      cmpb $0, %al                         # Checks for the 0 'null terminator' char.
      je   .done                           # If we finished 'read' and modify the string, dumo to done                    
      movb (%rdi, %rax), %dl               # Move pstring1[rax] to dl = read one byte each time
      cmpb $122, %dl                       # Checks if the char's ASCII is greater than the ASCII value of 'z'
      ja   .skip_swap
      cmpb $65, %dl                        # Checks if the char's ASCII is smaller than the ASCII value of 'A'
      jb   .skip_swap
      cmpb $91, %dl                        # If the char is lower case
      jb   .to_upper_Case                     
      cmpb $96, %dl                        # If the char is upper case
      ja   .to_lower_Case                     
      jmp  .skip_swap

  # Skip modification this time              
  .skip_swap:
      decb %al                             # Decrement by 1 al
      jmp  .loop
          
  # Swaps lower case chars to upper case chars
  .to_upper_Case:
      addb $32, %dl                        # Add 32 which makes a lower case equal to the similiar upper case
      movb %dl, (%rdi, %rax)               # Store it
      jmp .skip_swap
  # Swaps upper case chars to lower case chars
  .to_lower_Case:
      subb $32, %dl                        # Substract 32 which makes a upper case equal to the similiar lower case
      movb %dl, (%rdi, %rax)               # Store it again
      jmp .skip_swap

  # After finishing the loop, return the modified pstring
  .done:
      movq %rdi, %rax          # Sets rax with the modified string
      # Epilogue
      movq %rbp, %rsp
      popq %rbp
      ret                     # Return the length value
      jmp .exit_program

.globl pstrijcpy
	      .type	pstrijcpy, @function
pstrijcpy:
# Parameters:
# rdi - dst Pstring
# rsi - src Pstring
# rdx (dl) - i 
# rcx (cl) - j
  # Enter - Prologue
  pushq %rbp
  movq %rsp, %rbp 
  xorq %r12, %r12           # Clear r12
  xorq %r15, %r15           # Clear r15
  movb (%rdi), %r12b        # Store the length of dst Pstring in the lowbyte of r12
  movb (%rsi), %r15b        # Store the length of src Pstring in the lowbyte of r15

# Loops and modifies dst Pstring from [i] to [j]
.loopij:
  cmpb %dl, %cl             # Checks if j < i then we need to exit the loop
  jb  .finishij
  movb 1(%rsi, %rdx), %r12b # Stores pstring1[i+1] in a temp
  movb %r12b, 1(%rdi, %rdx) # Moves the temp to pstring2[i+1]
  incb %dl                  # Increments i by 1
  jmp  .loopij

.finishij:
  movq %rdx, %rax                    # Returns Pstring1
  # Epilogue
  movq %rbp, %rsp
  popq %rbp
  ret
  jmp .exit_program

.exit_program:
    # Exit = the Epilogue
      xorq %rax, %rax
      movq %rbp, %rsp
      popq %rbp
      ret
    
