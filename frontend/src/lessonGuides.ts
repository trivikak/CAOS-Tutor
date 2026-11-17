type LessonGuide = {
  basics: string;
  notes: string[];
  context: string;
  walkthrough: [string, string, string];
};

export const lessonGuides: Record<string, LessonGuide> = {
  numbers: {
    basics:
      'A bit has two possible values: zero and one. Eight bits make a byte, which can hold 256 different patterns. To read any of those patterns as a number, you need to know how many bits are available and whether the pattern can represent negative values. Those two choices explain why the same byte can mean 251 in one program and −5 in another.',
    notes: [
      'Hexadecimal compresses groups of four bits.',
      'Signedness assigns meaning to the bits.',
      'Overflow depends on the range that the chosen interpretation allows.',
    ],
    context:
      'Suppose a program needs to store −5 in one byte. The example first constructs the bit pattern, then reads it back as a signed number to check that it represents the intended value.',
    walkthrough: [
      'Write +5 with leading zeros to establish eight bits.',
      'Invert every bit and add one, retaining the low eight bits.',
      'Verify the result by giving the high bit weight −128 and adding the remaining positive weights.',
    ],
  },
  'numbers-bases': {
    basics:
      'The position of a digit tells you how much it contributes to a number. For example, the 2 in decimal 24 contributes twenty because it sits in the tens position. Binary follows the same rule with powers of two, and hexadecimal uses powers of sixteen. Since sixteen equals two to the fourth power, four binary digits fit into one hexadecimal digit.',
    notes: [
      'Start numbering positions at zero from the right.',
      'Four binary bits form one hex digit.',
      'Keep all four bits in interior groups when converting back.',
    ],
    context:
      'The example rewrites 101101₂ in hexadecimal and then checks the answer in decimal. The notation changes twice, but all three forms describe the same number.',
    walkthrough: [
      'Group from the right and pad the left group to obtain 0010 1101.',
      'Read each group as a single hex digit, giving 0x2D.',
      'Multiply the left digit by 16 and add 13 for D to check that the value is 45.',
    ],
  },
  'numbers-signed': {
    basics:
      'A byte can hold the integers 0 through 255 if every set bit adds a positive amount. To represent negative integers with the same number of bits, two’s complement assigns a negative weight to the leftmost bit. Once that bit is set, the remaining bits move the value upward from the most negative value toward −1.',
    notes: [
      'An eight-bit signed value spans −128 through 127.',
      'Copy the sign bit when widening a signed value.',
      'The smallest value cannot be negated at its original width.',
    ],
    context:
      'Imagine a debugger showing 1000 0011 from memory. The signed and unsigned views read the same byte, so the difference in their answers must come from the way they interpret its bits.',
    walkthrough: [
      'Sum its unsigned weights, 128 + 2 + 1, to get 131.',
      'Subtract 256 for the signed view because the top bit is set.',
      'Verify that −128 + 2 + 1 equals −125.',
    ],
  },
  'numbers-overflow': {
    basics:
      'Four bits have room for sixteen distinct patterns. When adding two values, it helps to find the answer on paper before deciding whether it fits in those patterns. An unsigned four-bit value can reach 15, while a signed four-bit value can reach only 7. A sum such as 9 therefore fits only under the unsigned interpretation.',
    notes: [
      'Carry-out detects unsigned addition overflow.',
      'Two equal-sign inputs yielding the opposite sign detect signed overflow.',
      'C signed overflow is undefined, so check bounds before adding.',
    ],
    context:
      'The example adds 7 and 2 using four-bit storage. As you follow the addition, compare the mathematical sum with the number that the stored result represents in each interpretation.',
    walkthrough: [
      'Decode 0111 as 7 and 0010 as 2, then calculate their mathematical sum of 9.',
      'The low four bits are 1001 with no carry out, so unsigned 9 fits.',
      'Signed 1001 is −7. A mathematical result of +9 exceeds the signed maximum of +7.',
    ],
  },
  'numbers-floating': {
    basics:
      'Binary floating point is similar to scientific notation. One part of the number holds its significant digits, and another tells you how far to move the binary point. A fixed number of significant digits is enough for some fractions. Other fractions require infinitely many digits in binary and must be rounded before the computer can store them.',
    notes: [
      'A reduced fraction terminates in binary when its denominator is a power of two.',
      'Spacing between representable values increases with magnitude.',
      'Rounding intermediate operations can make arithmetic depend on grouping.',
    ],
    context:
      'The example compares 0.625 with 0.1. Both have short decimal forms, but only one can be represented exactly with a finite number of binary digits.',
    walkthrough: [
      'Give the positions after the point weights 1/2, 1/4, and 1/8.',
      'For 0.101₂, add 1/2 and 1/8 to get exactly 0.625.',
      'The denominator of 1/10 contains a factor of five, so its binary expansion repeats.',
    ],
  },
  logic: {
    basics:
      'A logic gate receives signals that represent zero or one and produces an output according to a rule. By connecting the output of one gate to the input of another, we can build circuits that answer questions such as whether two bits match or whether an addition produces a carry. A different kind of circuit can store an answer so it remains available after the inputs change.',
    notes: [
      'List all four combinations for two inputs.',
      'Combinational circuits depend on current inputs.',
      'Sequential circuits also store state from earlier events.',
    ],
    context:
      'The full adder below computes one column of a binary addition. Like a column in decimal addition, it needs to account for the two digits and any carry passed over from the preceding column.',
    walkthrough: [
      'Compute the total 1 + 1 + 0 to predict binary 10.',
      'Use XOR to get the low sum bit: equal operand bits produce zero, and carry-in leaves it unchanged.',
      'The two set operand bits make carry-out one. Read carry-out followed by sum.',
    ],
  },
  'logic-gates': {
    basics:
      'A truth table is a record of what a circuit does for each possible combination of inputs. When a circuit combines several gates, it helps to record the result of one gate before calculating the next. Those intermediate columns show exactly how the final decision depends on the inputs.',
    notes: [
      'An n-input table has 2ⁿ rows.',
      'OR includes the both-true case, while XOR excludes it.',
      'Two circuits with identical complete output columns implement the same function.',
    ],
    context:
      'Suppose a circuit should produce one whenever two input bits are equal. The example starts with a gate that detects a difference, then reverses its output to detect a match.',
    walkthrough: [
      'List 00, 01, 10, and 11.',
      'Mark XOR as one for 01 and 10, where inputs differ.',
      'Invert the XOR column. The remaining ones at 00 and 11 identify equality.',
    ],
  },
  'logic-combinational': {
    basics:
      'A combinational circuit calculates a result from the signals currently on its inputs. A full adder uses its three inputs to calculate the sum bit and carry for one column. A multiplexer has a different role: a control input tells it which of several data inputs to pass along. Both circuits can be understood by tracing the values on their wires.',
    notes: [
      'A full adder includes carry-in.',
      'A ripple-carry design passes each carry to the next stage.',
      'Multiplexer select inputs control routing rather than contributing data bits.',
    ],
    context:
      'The example adds two short binary numbers. Pay particular attention to how a carry produced by the rightmost column becomes an input to the column on its left.',
    walkthrough: [
      'Add the low bits 1 + 1, yielding sum zero and carry one.',
      'Add high bits 0 + 1 and the incoming carry. Again the sum is zero and carry is one.',
      'Prepend the final carry to the two sum bits to get 100₂.',
    ],
  },
  'logic-registers': {
    basics:
      'A flip-flop stores a bit. In a D flip-flop, the input called D is the value available to store, and the output called Q reports the value already stored. A clock provides the timing signal that tells the circuit when to sample D. Several flip-flops connected to the same clock can store the bits of a number together in a register.',
    notes: [
      'A register groups flip-flops under one clock.',
      'Physical inputs need to remain stable around the edge.',
      'Combinational logic can feed a register’s output back to compute its next state.',
    ],
    context:
      'The example follows D and Q while the clock changes. Keeping the two signals separate will help you see why a change to the input does not immediately replace the stored bit.',
    walkthrough: [
      'D changes to one before the edge. Since there is no sampling event yet, Q stays zero.',
      'At the edge, the flip-flop samples one. Q reflects it after a short propagation delay.',
      'D returns to zero between edges. Q retains one until the next capture.',
    ],
  },
  c: {
    basics:
      'A C program stores values in objects, such as an integer variable or an element of an array. A pointer records the location of an object, which lets the program access it indirectly. The type attached to a pointer tells C what kind of object to expect there and how far to move when the program advances to the next element.',
    notes: [
      'Use address-of to obtain a pointer and dereference to access the object.',
      'Array indices start at zero.',
      'An address can become invalid when an object’s lifetime ends.',
    ],
    context:
      'The example asks C for enough storage to hold four integers and then writes to the third slot. Follow both the arithmetic used to find the slot and the checks that make the write safe.',
    walkthrough: [
      'Use four times sizeof *values for the required bytes. Check for allocation failure before accessing storage.',
      'Write index 2, which is also *(values + 2).',
      'Release the allocation once done. Clearing the local pointer does not clear any aliases.',
    ],
  },
  'c-functions': {
    basics:
      'A function gives a name to a task so other parts of a program can ask for it. A caller supplies arguments, which become the function’s local parameters. The function can then calculate a result, using a loop to repeat work when the number of operations depends on the input.',
    notes: [
      'A for loop initializes once, checks before each body, and updates afterward.',
      'C integer division truncates toward zero.',
      'Passing a pointer copies the address but can still permit updates to the pointed-to object.',
    ],
    context:
      'To see how a parameter controls a loop, trace the call sum_to(3). At every pass, keep track of the current number and the amount accumulated so far.',
    walkthrough: [
      'Set limit to 3, sum to zero, and i to one.',
      'The three successful tests add 1, then 2, then 3, giving running totals 1, 3, and 6.',
      'The next update sets i to four, the test fails, and the function returns six.',
    ],
  },
  'c-arrays': {
    basics:
      'An array holds a series of objects of the same type beside one another in memory. C numbers the elements from zero, so the third element has index two. A pointer to the first element can also reach the third: adding two moves by two elements and automatically accounts for their size in bytes.',
    notes: [
      'Addition advances by elements.',
      'Arrays commonly convert to pointers when passed as arguments, so pass the length separately.',
      'One-past pointers are valid end markers and cannot be dereferenced.',
    ],
    context:
      'The example reads the same value using an array index and a pointer. It also shows a position just beyond the array that is useful for ending a loop.',
    walkthrough: [
      'Set p from values so it points at the object containing 10.',
      'Advance two elements and dereference p + 2. Both that expression and values[2] read 30.',
      'Form p + 4 as an end marker. There is no element there to read.',
    ],
  },
  'c-allocation': {
    basics:
      'A local variable normally remains available only while execution is in its block. When a program needs storage with a different lifetime, it can request memory with malloc and later return it with free. Between those operations, the program must keep track of which part of the code is responsible for the allocation.',
    notes: [
      'malloc reserves uninitialized bytes.',
      'Check failure and guard size multiplication if counts come from input.',
      'Every borrowed pointer expires when the owner frees the allocation.',
    ],
    context:
      'The example allocates an array, writes to one element, and releases it. Pay attention to when the memory first becomes usable and what changes when it is released.',
    walkthrough: [
      'Compute the requested bytes from the count and element size. On NULL, return before accessing the result.',
      'Write 7 to the first slot. The other slots remain uninitialized.',
      'Call free once after use. Setting values to NULL clears that variable only.',
    ],
  },
  'c-toolchain': {
    basics:
      'The command that builds a C program combines several jobs. The compiler turns source into assembly instructions, the assembler turns those instructions into an object file, and the linker combines that file with others. This separation lets a project build individual source files before joining them into a complete program.',
    notes: [
      'Headers commonly declare interfaces.',
      'Object files can carry unresolved symbols and relocation records.',
      'A missing definition often surfaces at link time even when its declaration was valid.',
    ],
    context:
      'Suppose main.c calls a helper that has already been compiled into math.o. The example separates the build stages so you can see when the call is finally matched with the helper’s definition.',
    walkthrough: [
      'Use cc -S to translate main.c to inspectable assembly.',
      'Use cc -c to assemble the instructions into an object file.',
      'Link both objects. The linker matches the reference from main.o with the definition in math.o.',
    ],
  },
  assembly: {
    basics:
      'A processor understands instructions encoded as bits. An instruction set defines what each encoding means, and assembly provides names that make those instructions readable. The assembler translates the names and operands into the form required by the processor.',
    notes: [
      'Registers provide values and immediates embed constants.',
      'Loads and stores access memory explicitly.',
      'Check the ISA before interpreting operand order.',
    ],
    context:
      'The example computes a small sum using RISC-V instructions, then saves it in memory. It shows how constants, register values, and memory addresses play different roles in the same program.',
    walkthrough: [
      'Add 7 and 5 separately to the zero register to initialize t0 and t1.',
      'Add those two register values and save the result in t2.',
      'Store the word at the address sp + 8, with the displacement counted in bytes.',
    ],
  },
  'assembly-encoding': {
    basics:
      'An encoded instruction divides its bits into fields, each with a particular job. One field helps identify the instruction, while others may specify registers or contain a constant. The positions of these fields are part of the instruction format, which the assembler and processor must interpret in the same way.',
    notes: [
      'The lowest seven bits hold the opcode in this RV32I example.',
      'Five bits can name any of 32 registers.',
      'A function field can distinguish operations sharing an opcode.',
    ],
    context:
      'The example encodes a single ADDI instruction. Instead of memorizing its final bit pattern, use the field boundaries to see how the operation and its operands are represented.',
    walkthrough: [
      'Represent 7 in the 12-bit immediate and encode x0 as rs1 with five zeros.',
      'Use funct3 000 for ADDI and rd 00101 for x5.',
      'Place opcode 0010011 at the right. Decoding it tells the CPU to add 7 to zero and write x5.',
    ],
  },
  'assembly-addressing': {
    basics:
      'An instruction can get a value directly from a register or from a constant written into the instruction. When it needs a value from memory, it first has to calculate the address. In RISC-V, a load often gets that address by adding a fixed number of bytes to a register that holds a starting location.',
    notes: [
      'The effective address is where memory will be accessed.',
      'A load returns the contents there.',
      'Word array indices need scaling to byte displacements.',
    ],
    context:
      'Both instructions in the example calculate the same sum. Follow what each does afterward to see the difference between a memory address and the value stored there.',
    walkthrough: [
      'Add 12 bytes to the base to get 0x100C.',
      'addi places that sum itself into t0.',
      'lw treats the sum as an address and copies the word from that location into t0.',
    ],
  },
  'assembly-instruction-types': {
    basics:
      'A register is a small storage location inside the processor. Arithmetic instructions can work with values already in registers, while loads and stores move data between registers and memory. This separation explains why even a simple update to a value in memory can require several instructions.',
    notes: [
      'A load writes a register and a store writes memory.',
      'Bitwise instructions operate on corresponding bits.',
      'Track registers and memory separately when tracing a program.',
    ],
    context:
      'The example increases a word in memory by one. Track the register and memory separately so you can tell when each location changes.',
    walkthrough: [
      'Load the original word into t0.',
      'Increment t0 with addi. Memory still holds the original word.',
      'Store t0 back to the address in a0 to make the result visible in memory.',
    ],
  },
  control: {
    basics:
      'To run a program, the processor has to know which instruction comes next. It keeps that address in the program counter and normally advances it after each instruction. Branches and calls can choose a different address, while the processor’s internal design determines how much time the resulting sequence takes to execute.',
    notes: [
      'Calls preserve a return address.',
      'Pipelines can overlap work.',
      'CPU time depends on clock rate, instruction count, and average cycles per instruction.',
    ],
    context:
      'The example estimates the time a program spends on the CPU. It starts with the amount of work the program requires and uses the processor’s clock rate to convert that work into seconds.',
    walkthrough: [
      'Multiply instructions by CPI to get two million cycles.',
      'Divide by one billion cycles per second to get 0.002 seconds.',
      'Convert seconds to milliseconds, giving 2 ms.',
    ],
  },
  'control-cycle': {
    basics:
      'An instruction begins as bits stored in memory. The processor fetches those bits, interprets them to determine the requested operation, then obtains the values it needs to carry it out. For a register addition, the final step places the result in the destination register so a later instruction can use it.',
    notes: [
      'Fetching an instruction differs from loading data.',
      'Decoding selects the intended operation.',
      'Real processors may overlap these stages while preserving architectural results.',
    ],
    context:
      'Follow one RISC-V addition from its address to its result. The trace identifies where the inputs come from, where the sum goes, and how the processor finds the next instruction.',
    walkthrough: [
      'Fetch the bits and decode source registers x6 and x7 and destination x5.',
      'Read their values 4 and 9 and add them in the ALU.',
      'Write 13 to x5 and advance four bytes to 0x104.',
    ],
  },
  'control-branches': {
    basics:
      'A branch allows a program to choose its next instruction based on a condition. A loop often uses a branch that points back to an earlier instruction. Once the condition becomes false, execution continues past the branch. When tracing such a loop, the order of the update and the test determines which values the branch sees.',
    notes: [
      'Taken branches move to the target.',
      'Untaken branches fall through.',
      'Track when the test occurs relative to the update to avoid an off-by-one count.',
    ],
    context:
      'The loop begins with a counter of three and subtracts one before each test. Notice that the final pass still performs the subtraction, even though it does not jump back.',
    walkthrough: [
      'First decrement yields two, so jump back to loop.',
      'Second decrement yields one, so jump back again.',
      'Third decrement yields zero and falls through. Three iterations produced two taken branches.',
    ],
  },
  'control-calls': {
    basics:
      'When one function calls another, the processor needs to remember where to continue afterward. That location is the return address. If a second call happens before the first has finished, it needs a return address of its own. Saving the first address in memory keeps both destinations available.',
    notes: [
      'RISC-V commonly uses ra for the current return address.',
      'A nested call can overwrite it.',
      'The stack frame can hold the old value until the caller returns.',
    ],
    context:
      'Imagine that main calls a function named f and that f calls g before returning. The example follows the return address as it moves between a register and the stack.',
    walkthrough: [
      'The first call records the return point in main. f saves it on the stack.',
      'The call to g overwrites ra with a return point inside f. g uses that address to return.',
      'f restores the original address from the stack and uses it to return to main.',
    ],
  },
  'control-performance': {
    basics:
      'A processor can handle parts of several instructions at once, much as a production line handles several items at different stations. This arrangement can increase the number of instructions completed per second. If one instruction needs a result that is still being computed, however, part of the line may have to wait.',
    notes: [
      'Data dependencies and wrong predictions can cost cycles.',
      'Forwarding sometimes avoids a stall.',
      'Compare instruction count and CPI as well as frequency when judging speed.',
    ],
    context:
      'The example uses an average cycles-per-instruction value to estimate the runtime of a program. That average accounts for the fact that some instructions or parts of the run take longer than others.',
    walkthrough: [
      'Multiply by 1.5 to find three million total cycles.',
      'A 2 GHz clock provides two billion cycles per second. Divide total cycles by that rate.',
      'Convert 0.0015 seconds to 1.5 ms. Extra stalls at the same frequency would raise that time.',
    ],
  },
  cache: {
    basics:
      'The processor uses several layers of storage because offering both very large capacity and very fast access is difficult. A cache keeps small groups of bytes close to the processor so that later accesses can reuse them. A request that finds its data there is called a hit, while a request that must retrieve the data from another level is called a miss.',
    notes: [
      'A miss penalty measures additional time beyond a lookup.',
      'Spatial locality reuses nearby bytes, while temporal locality reuses the same bytes.',
      'I/O uses separate mechanisms to coordinate device transfers.',
    ],
    context:
      'The example calculates an average access time for a cache. Most requests are inexpensive, but occasional misses add enough time to affect the mean.',
    walkthrough: [
      'Start with the 1 ns lookup cost paid by every access in this model.',
      'Multiply the extra 60 ns by 0.05. Misses add 3 ns to the average.',
      'Add lookup and weighted penalty to get 4 ns. That average is not the latency of every individual access.',
    ],
  },
  'cache-locality': {
    basics:
      'When a cache fetches a byte, it usually fetches nearby bytes with it as a block. A program can benefit from this arrangement by reading adjacent data soon afterward. It can also benefit by revisiting data before the cache has replaced the block, which explains why both address order and timing matter.',
    notes: [
      'Temporal locality revisits the same data soon.',
      'Spatial locality visits nearby bytes.',
      'A large stride usually uses less of each fetched block.',
    ],
    context:
      'Imagine reading an array in order when four integers fit into one cache block. The example shows which reads can reuse the first block and which read crosses into the next one.',
    walkthrough: [
      'On an initial miss, reading a[0] brings in the entire block containing a[0] through a[3].',
      'The next three elements are already in that block. They can hit if it stays cached.',
      'a[4] lies 16 bytes after the start and needs a different block.',
    ],
  },
  'cache-mapping': {
    basics:
      'A direct-mapped cache assigns each block of memory one place where it can be stored. Since many blocks may be assigned to the same place, the cache also records which block it is holding there. The place is called the index, and the recorded identifier is called the tag.',
    notes: [
      'Divide the byte address by block size for the block number.',
      'The remainder is the offset.',
      'Take block number modulo line count for the index, and use the quotient for the tag.',
    ],
    context:
      'Compare the memory addresses 0x34 and 0x74 in a four-line cache. The calculation shows how two different blocks can compete for a single line even when other lines are available.',
    walkthrough: [
      '0x34 belongs to block 3 with byte offset 4. It maps to index 3 with tag 0.',
      '0x74 belongs to block 7 with offset 4. It also maps to index 3, with tag 1.',
      'The tags distinguish the two blocks. Alternating them can repeatedly evict the current contents of line 3.',
    ],
  },
  'cache-io': {
    basics:
      'A device such as a disk carries out work through a controller. A driver gives the controller instructions and learns when the work has finished. It can check repeatedly, or it can let the device notify the processor. For a large transfer, the controller may also move the data itself after the driver sets it up.',
    notes: [
      'Polling repeatedly reads status and can suit short waits.',
      'Interrupts notify software of events.',
      'DMA moves data after the driver configures the transfer.',
    ],
    context:
      'The example follows a disk read from setup to completion. It distinguishes moving the data into memory from notifying the processor that the data is ready.',
    walkthrough: [
      'Prepare a suitable destination buffer and give the controller the transfer information.',
      'The controller writes the data using DMA while the CPU can do other work.',
      'On completion, handle the interrupt and verify success before passing the buffer to its consumer.',
    ],
  },
  processes: {
    basics:
      'A process gives a running program its own view of memory and access to resources such as open files. One or more threads carry out its instructions. The operating system decides when those threads run and provides a controlled interface for work that needs privileges, such as creating another process.',
    notes: [
      'System calls enter protected kernel code.',
      'The scheduler chooses runnable threads.',
      'POSIX separates creating a process from loading a new program into it.',
    ],
    context:
      'A parent process creates a child and waits for it to finish. The example follows both paths after the creation call so you can see how each process knows which part of the code to run.',
    walkthrough: [
      'Check fork for −1, which means no child was created.',
      'A successful child sees zero and runs its branch, calling _exit(0).',
      'The parent receives the child PID and waits for that child with waitpid.',
    ],
  },
  'processes-system-calls': {
    basics:
      'An ordinary application cannot directly perform every operation the machine supports. For example, reading data through a file descriptor asks the operating system to use or check resources on the application’s behalf. A system call transfers control to the kernel, which handles that request and returns a result the application must interpret.',
    notes: [
      'The kernel validates arguments and may block while waiting for an event.',
      'Library wrappers can adapt the interface.',
      'Inspect errno after an error return, since successful calls need not clear it.',
    ],
    context:
      'The example reads data into a buffer. It explains how to distinguish useful bytes, the end of an input stream, and a request that failed.',
    walkthrough: [
      'Pass the descriptor, buffer, and maximum byte count. The request limits what the kernel may return.',
      'For a positive result, process exactly that many bytes, even if fewer than requested.',
      'With a nonzero request, zero can indicate EOF. A result of −1 indicates an error to investigate.',
    ],
  },
  'processes-lifecycle': {
    basics:
      'On POSIX systems, creating another process and choosing the program it runs are separate operations. A child starts by running the same program as its parent, which gives it a chance to prepare its environment before replacing the running program. The parent can continue its own work or wait for the child to finish.',
    notes: [
      'fork returns twice on success.',
      'exec keeps the PID while replacing the process image.',
      'waitpid collects exit information and reaps the child.',
    ],
    context:
      'A command launcher is a useful case because it needs a separate process for the requested program. Follow what the child and parent do after the call to fork.',
    walkthrough: [
      'Call fork. Check for failure and distinguish zero in the child from the positive PID in the parent.',
      'The child calls execvp. Reaching _exit(127) means replacement failed and execvp returned.',
      'The parent waits on the specific PID and retrieves the exit status once the child terminates.',
    ],
  },
  'processes-scheduling': {
    basics:
      'Several threads can be ready to run even when only one processor is available for them. The scheduler chooses which ready thread gets that processor. A thread waiting for a disk operation is in a different situation because giving it processor time cannot make its request finish sooner.',
    notes: [
      'Running means currently on a CPU.',
      'I/O completion can move a thread to runnable.',
      'Context switches save and restore execution state and have a cost.',
    ],
    context:
      'The example follows two threads that share a CPU. It shows how the second can make progress while the first waits and why the first may still have to wait its turn after the disk responds.',
    walkthrough: [
      'A requests data and blocks until the disk completes the request.',
      'The scheduler runs B using its saved execution state.',
      'Completion moves A back to runnable. The scheduler will choose when it actually resumes.',
    ],
  },
  virtual: {
    basics:
      'A program uses virtual addresses to refer to its memory. Before reaching the actual memory hardware, the processor translates those addresses using mappings established by the operating system. Grouping addresses into equally sized pages allows a single mapping to describe a whole region while keeping permissions under operating system control.',
    notes: [
      'Pages and frames have equal sizes.',
      'Page tables store frame mappings and permissions.',
      'A TLB caches translations so repeated accesses need fewer lookups.',
    ],
    context:
      'The example translates one address by replacing its virtual page with the corresponding physical frame. The position of the requested byte within that page remains the same.',
    walkthrough: [
      'A 4 KiB page spans 0x1000 bytes, so split the address after the leading 1.',
      'Frame 9 starts at 0x9000. Retain the original 0x234 byte offset.',
      'Add the offset to the frame base to get physical address 0x9234.',
    ],
  },
  'virtual-translation': {
    basics:
      'An address identifies both a page and a position within that page. The page number tells the processor which mapping to look up. The remaining part, called the offset, says how far the byte is from the start of the page. Once the mapping finds a physical frame, the processor uses that same offset within the frame.',
    notes: [
      'Page size gives the number of offset bits.',
      'High bits identify the mapping.',
      'A valid mapping still needs permission for the requested access.',
    ],
    context:
      'Translate 0x5ABC on a machine with 4 KiB pages. The example shows why the last three hexadecimal digits stay the same even though the high digits change.',
    walkthrough: [
      '4 KiB equals 2¹² bytes, so the low three hex digits form the offset 0xABC.',
      'Look up page 5 and obtain physical frame 9, whose base is 0x9000.',
      'Keep the offset and combine it with the frame base to obtain 0x9ABC.',
    ],
  },
  'virtual-tlb': {
    basics:
      'A translation lookaside buffer, or TLB, is a small cache for recent address translations. It lets the processor reuse an answer without looking it up in the page table again. When a translation is absent from the cache, the next question is whether the page table already contains a usable mapping.',
    notes: [
      'Cached permissions matter as well as the frame number.',
      'A page fault needs exception handling.',
      'Mapping changes may require invalidating old cached translations.',
    ],
    context:
      'The example follows a read whose translation is missing from the TLB. Check the page table before deciding whether the operating system needs to handle a page fault.',
    walkthrough: [
      'The TLB lookup misses, so consult the page table.',
      'The page entry supplies a usable frame and permissions. Cache that translation for future use.',
      'Retry or complete the read with the translated address. No page fault was needed in this case.',
    ],
  },
  'virtual-demand': {
    basics:
      'Reserving part of a program’s address space does not require the operating system to give every page physical storage immediately. When a program first accesses a reserved page, the processor can ask the operating system to complete the mapping. This lets the system delay work and save physical memory when some pages are never used.',
    notes: [
      'A legal first access can fault.',
      'Clean file-backed data can generally be reloaded.',
      'Modified data that remains needed may require writeback before its frame can be reused.',
    ],
    context:
      'A program first touches a valid anonymous page that has no physical frame assigned. Follow how the operating system prepares the frame and lets the original instruction run again.',
    walkthrough: [
      'The absent translation causes a fault. The kernel checks that the address and access are legal.',
      'Provide a zeroed frame and install its mapping so old physical memory contents cannot leak to the program.',
      'Retry the instruction against the installed mapping. A first write now changes the newly allocated page.',
    ],
  },
  ipc: {
    basics:
      'Separate processes normally cannot read or write one another’s private memory. When they need to exchange information, they use a mechanism provided by the operating system. Some mechanisms deliver bytes, while others deliver complete messages or give processes a common region of memory.',
    notes: [
      'Pipes carry byte streams.',
      'Message queues preserve records.',
      'Shared memory maps common storage and needs coordination around shared updates.',
    ],
    context:
      'Follow a short message through a pipe from a parent to a child. In addition to moving the bytes, the processes must agree when the reader should stop expecting more.',
    walkthrough: [
      'Create a read end and a write end. After fork, each process has descriptors for both.',
      'The writer closes its read end and sends hello. The reader closes its unused write end.',
      'Close the remaining writer. The reader drains the buffered bytes, then sees EOF.',
    ],
  },
  'ipc-pipes': {
    basics:
      'A pipe is a temporary connection through which one part of a program can write bytes and another can read them. A file descriptor is the program’s handle for an end of that connection. After a process creates a child, both processes can hold handles to the same ends, which affects when the reader knows that writing has finished.',
    notes: [
      'Reads may return short.',
      'An empty blocking pipe waits while a writer reference remains.',
      'EOF requires an empty buffer and no open writer references.',
    ],
    context:
      'The example follows the parent and child after they inherit both pipe descriptors. Keep track of which copies of the write end remain open at each stage.',
    walkthrough: [
      'Both processes inherit both ends when the parent forks.',
      'The child closes its write end. The parent closes its read end, writes, and closes its write end.',
      'The child reads remaining bytes, then gets EOF because no write reference survives.',
    ],
  },
  'ipc-shared': {
    basics:
      'Two processes can ask the operating system to make the same physical storage available in both of their address spaces. They can then see the same underlying bytes even if each uses a different address to reach them. A useful way to refer to a shared item is to record how far it is from the start of the region.',
    notes: [
      'Store relative offsets or indexes.',
      'Use process-shared synchronization for updates.',
      'Initialize the layout before other processes read it.',
    ],
    context:
      'The example locates a single shared item in two processes. Comparing their addresses shows which piece of information the processes can safely exchange.',
    walkthrough: [
      'Process A adds the offset to base 0x1000 and obtains 0x1040.',
      'Process B adds that same offset to base 0x9000 and obtains 0x9040.',
      'Persist the offset 0x40 so each process can reconstruct its own usable address.',
    ],
  },
  'ipc-messages': {
    basics:
      'An application often treats data as records, such as individual lines or requests. A pipe, however, delivers a sequence of bytes and may return only part of a record at a time. A framing rule lets the receiver collect those pieces until it has enough information to recover a complete record.',
    notes: [
      'A delimiter works when content cannot contain it unescaped.',
      'A length prefix can describe arbitrary bytes.',
      'Buffer incomplete records until you have enough data.',
    ],
    context:
      'The sender wants to transmit the words cat and dog as separate records. The example shows how a delimiter lets the reader recover the words even when the reads split them differently.',
    walkthrough: [
      'A stream with no framing may deliver catdog in one read or just ca initially.',
      'Add a newline after each record. Append each received chunk to a buffer and look for a newline.',
      'Extract each complete record and keep any incomplete suffix for the next read.',
    ],
  },
  sync: {
    basics:
      'Threads in one process can work with the same data. That makes communication convenient, but it also means one thread can observe a change while another is still making it. Synchronization gives threads rules for taking turns and for waiting until a shared resource is ready to use.',
    notes: [
      'A mutex serializes access to shared state.',
      'A condition variable lets a thread wait for that state to change.',
      'A common lock order helps avoid circular waits.',
    ],
    context:
      'A consumer needs to wait until a producer puts something in a queue. The example explains how the consumer can wait safely while still giving the producer a chance to update the queue.',
    walkthrough: [
      'Lock the mutex and check the count under its protection.',
      'If it is zero, wait on the condition variable. Waiting releases the mutex temporarily so a producer can add an item.',
      'After reacquiring the lock, test the count again. Consume an available item and update the count before unlocking.',
    ],
  },
  'sync-mutexes': {
    basics:
      'Two threads that increase the same counter can interfere with each other if they both read its old value before either stores a new one. A mutex is a lock that gives one thread at a time permission to perform the complete update. To see where the lock belongs, follow the read, addition, and write as separate actions.',
    notes: [
      'Use the same mutex on all accesses that rely on the invariant.',
      'Locking only stores still allows stale reads.',
      'A C race on a non-atomic object is undefined behavior.',
    ],
    context:
      'Start with a shared counter of ten and let two threads attempt an increment. The trace illustrates how one increment can be lost and how a lock covering the entire update prevents that schedule.',
    walkthrough: [
      'Both threads read the initial ten before either writes. Each computes eleven.',
      'Both write eleven, which loses one update compared with the intended twelve.',
      'With one mutex covering each complete increment, the second worker reads eleven and writes twelve.',
    ],
  },
  'sync-conditions': {
    basics:
      'A thread sometimes needs to wait until a shared fact becomes true, such as a queue containing an item. A condition variable allows it to sleep until there is reason to check again. A semaphore answers a different question by keeping a count of available permits, such as the number of free slots.',
    notes: [
      'A condition wait releases the mutex while sleeping and gets it back before returning.',
      'Always recheck the predicate after waking.',
      'Each semaphore acquisition uses one permit.',
    ],
    context:
      'The example uses a condition variable to wait for work. Follow when the consumer holds the lock, when it gives the lock up, and why it checks the queue again on return.',
    walkthrough: [
      'Acquire the queue lock and enter the wait loop when count is zero.',
      'The wait lets the producer acquire the lock, add an item, and signal a change.',
      'The consumer rechecks count on return because another worker might have taken the item first.',
    ],
  },
  'sync-deadlock': {
    basics:
      'A lock can prevent two threads from changing shared data at the same time. However, a thread that holds one lock while requesting another may depend on a second thread that cannot proceed either. If these dependencies form a circle, the threads can remain stuck even though each follows its own instructions correctly.',
    notes: [
      'Look for mutual exclusion, holding while waiting, lack of preemption, and circular wait.',
      'A common total lock order prevents the circular condition.',
      'Apply it to every path.',
    ],
    context:
      'Two threads need the same pair of locks. The example compares what happens when they take the locks in opposite orders with what happens when both follow one agreed order.',
    walkthrough: [
      'Thread 1 locks A. Thread 2 locks B.',
      'Each waits for the lock held by the other, and neither reaches its release code.',
      'Make both threads request A before B. The loser waits for A while the winner can obtain B and finish.',
    ],
  },
  parallel: {
    basics:
      'A program can finish sooner if several workers perform independent parts of the job at the same time. Before dividing the work, identify which tasks must happen in sequence and how the partial results will be combined. The work that stays in sequence places a limit on how much time extra workers can save.',
    notes: [
      'Join workers before consuming final output.',
      'An irreducible serial part limits ideal speedup.',
      'Real systems also pay scheduling and memory costs.',
    ],
    context:
      'Estimate the improvement from four workers when most, but not all, of a task can be divided. The example accounts separately for work that stays sequential and work the workers can do together.',
    walkthrough: [
      'Normalize the original runtime to one. Serial work still costs 0.20.',
      'Divide the remaining 0.80 by four to get a parallel elapsed cost of 0.20.',
      'Total time is 0.40. Divide the original time by that value to get a 2.5× speedup.',
    ],
  },
  'parallel-partition': {
    basics:
      'To share an array calculation among threads, give each thread a range of elements to process. The ranges should cover the input without overlapping, and each thread should have a place to store its result. The main thread can then wait for those results and combine them once the workers finish.',
    notes: [
      'Use half-open ranges to avoid overlapping boundaries.',
      'Distribute any leftover elements if division is uneven.',
      'Keep worker inputs alive until their threads finish.',
    ],
    context:
      'Two threads will find the sum of ten elements. The example uses ranges that include their starting index and exclude their ending index, so the shared boundary belongs to only one worker.',
    walkthrough: [
      'Give the first worker [0, 5), which includes 0 through 4.',
      'Give the second worker [5, 10), which includes 5 through 9.',
      'Join both workers, then add their completed partial sums.',
    ],
  },
  'parallel-speedup': {
    basics:
      'Speedup compares how long a task took before and after a change. When the task itself stays fixed, the ideal benefit of extra workers depends on how much of the original time can be divided among them. Amdahl’s law expresses that idea while treating the remaining portion as a fixed cost.',
    notes: [
      'Only the parallel fraction is divided by worker count.',
      'The model assumes equal work distribution and no overhead.',
      'Unlimited workers cannot remove the serial time.',
    ],
    context:
      'The example estimates the best possible improvement for four workers. Begin with one unit of original runtime and separate the part that cannot be divided from the part that can.',
    walkthrough: [
      'Keep the serial cost at 0.20 units.',
      'Divide parallel cost 0.80 by four, obtaining 0.20 additional elapsed units.',
      'The new total is 0.40, giving 2.5× speedup. At unlimited workers the 0.20 serial cost still caps speedup at 5×.',
    ],
  },
  'parallel-contention': {
    basics:
      'Threads can work on different variables and still slow one another down. A cache handles memory in groups of nearby bytes called cache lines. When two processors repeatedly write different variables on one line, they may have to transfer control of that line back and forth. This effect is called false sharing.',
    notes: [
      'Lock contention makes threads wait for a lock.',
      'False sharing causes ownership transfers when separate writes land in one cache line.',
      'Use measurements to distinguish this cost from other bottlenecks.',
    ],
    context:
      'Imagine two workers updating neighboring counters. The trace follows the cache line that contains both counters and shows how fewer writes can reduce traffic between the cores.',
    walkthrough: [
      'The first core writes its counter and acquires the line for writing.',
      'The other core writes its own counter and needs ownership of the same line. Alternating writes can repeat the handoff.',
      'Accumulate locally and publish each total once to reduce writes to that cache line.',
    ],
  },
  network: {
    basics:
      'Programs communicate over a network through endpoints called sockets. A server makes an endpoint available, and a client uses it to begin a conversation. The protocol the programs choose determines whether they exchange a continuous sequence of bytes or separate messages and which delivery guarantees they can rely on.',
    notes: [
      'A TCP listener handles setup and connected sockets carry data.',
      'TCP streams require application framing.',
      'UDP preserves datagram boundaries without promising delivery.',
    ],
    context:
      'Follow a TCP server as it accepts one client, reads a request, and prepares to serve another client. The example separates the listening role from the communication role.',
    walkthrough: [
      'Create a listener with socket, bind, and listen.',
      'Accept a client and use the connected descriptor for send and receive operations.',
      'Read the length field before reading the payload. Close that connection when done and keep listening.',
    ],
  },
  'network-sockets': {
    basics:
      'A TCP server starts by listening at a local address and port. A client connects to that address and port, and the server accepts the connection. On the server, the listening socket stays available for new clients while a separate socket represents the conversation with one client.',
    notes: [
      'bind chooses the local address.',
      'listen prepares for incoming connections.',
      'accept returns a connected socket while leaving the listener available.',
    ],
    context:
      'The example follows the first client to connect to a server. Track the two server descriptors by their roles so you can identify which one should be used for data.',
    walkthrough: [
      'Create a socket, bind to the local address, and start listening.',
      'The client calls connect. The server accepts the pending connection and receives a second descriptor.',
      'Send and receive on that second descriptor. Keep the first descriptor for future accepts.',
    ],
  },
  'network-framing': {
    basics:
      'TCP gives a program an ordered sequence of bytes. The application still needs a rule for knowing which bytes belong to one message. One common rule places a length at the beginning of every message, allowing the receiver to tell how much content it should collect before processing it.',
    notes: [
      'Choose fixed lengths, delimiters, or a length prefix.',
      'Validate incoming lengths before allocating.',
      'Treat EOF mid-frame as incomplete input.',
    ],
    context:
      'A message starts with a four-byte length followed by five bytes of content. The example shows what to do when the network delivers those five bytes in more than one read.',
    walkthrough: [
      'Loop until you have all four header bytes. Decode 00 00 00 05 as five and check it against the allowed limit.',
      'Save the first two payload bytes and update your count. Three bytes are still needed.',
      'Read those remaining bytes before delivering the complete message. EOF before then leaves a truncated frame.',
    ],
  },
  'network-udp': {
    basics:
      'UDP delivers data in individual units called datagrams. This makes each update easy to identify, but the network may drop an update or deliver it after a newer one. Whether that is acceptable depends on what the program is sending and what the receiver needs to reconstruct.',
    notes: [
      'A small buffer can truncate a datagram.',
      'Sequence numbers can identify stale or duplicate updates.',
      'Choose transport by the delivery guarantees the application needs.',
    ],
    context:
      'Compare a stream of live position updates with a file transfer. In the first case a recent update can replace an older one, while the file receiver needs all of the original data.',
    walkthrough: [
      'Give updates sequence numbers. If update 8 arrives before 7, keep 8 and discard the stale update when it arrives.',
      'A missing position can be superseded by a newer message, which makes UDP suitable when the application tolerates loss.',
      'A file requires all bytes in order. TCP fits that requirement while the application still checks for incomplete transfers.',
    ],
  },
};
