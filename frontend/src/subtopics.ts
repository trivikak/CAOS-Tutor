import type { LessonContent } from './course';

export const subtopics: Record<string, LessonContent[]> = {
  numbers: [
    {
      id: 'numbers-bases',
      title: 'Binary and hexadecimal',
      summary: 'Convert positional notation and group bits into nibbles.',
      notes:
        'Each digit contributes its value times the base raised to its position, counting ' +
        'from zero at the right. Hexadecimal is a compact way to write bits because one hex ' +
        'digit encodes exactly four bits. Pad only on the left when grouping a whole binary ' +
        'integer. Leading zeroes leave the magnitude unchanged but can communicate the ' +
        'intended width.',
      example: '101101₂ = 0010 1101₂\n' + '0010 = 2, 1101 = D\n' + '0x2D = 2 × 16 + 13 = 45',
      question: 'What is 0x36 in binary?',
      options: ['0011 0110', '0110 0011', '0011 0011'],
      correct: 0,
      explanation: 'Group the two hex digits independently: 3 is 0011 and 6 is 0110.',
      hint: 'Translate each hex digit to four bits.',
    },
    {
      id: 'numbers-signed',
      title: 'Two’s complement',
      summary: 'Decode signed integers and distinguish signed from unsigned interpretation.',
      notes:
        'In an n-bit two’s-complement number the top bit has weight −2ⁿ⁻¹. The lower weights ' +
        'are positive. Equivalently, when the top bit is set, subtract 2ⁿ from the unsigned ' +
        'interpretation. Negation uses invert and add one at the same width. The most ' +
        'negative number has no positive counterpart at that width.',
      example: '8-bit 1000 0011\n' + 'Unsigned: 128 + 3 = 131\n' + 'Signed: 131 − 256 = −125',
      question: 'What is 1000 in 4-bit two’s complement?',
      options: ['8', '−8', '−7'],
      correct: 1,
      explanation: 'The top bit alone contributes −2³. No lower bits contribute.',
      hint: 'What is the signed weight of the highest bit?',
    },
    {
      id: 'numbers-overflow',
      title: 'Overflow and carry',
      summary: 'Determine whether a fixed-width result fits the chosen integer representation.',
      notes:
        'An n-bit adder keeps the low n bits. For unsigned addition, a carry out signals a ' +
        'result above 2ⁿ−1. For signed addition, two operands with the same sign overflow if ' +
        'the result has the opposite sign. Treat this as hardware behavior: in C, signed ' +
        'integer overflow is undefined, while unsigned arithmetic wraps modulo the type’s ' +
        'range.',
      example:
        '4-bit addition: 0111 + 0010 = 1001\n' +
        'Unsigned: 7 + 2 = 9, no overflow\n' +
        'Signed: 7 + 2 cannot fit in −8 through 7',
      question: 'Does signed 4-bit addition of 0100 and 0100 overflow?',
      options: [
        'No, because there is no carry out.',
        'No, because 8 fits in signed 4-bit.',
        'Yes, two positives produced a negative bit pattern.',
      ],
      correct: 2,
      explanation: 'The signed maximum is 7. The low four bits are 1000, interpreted as −8.',
      hint: 'Compare the mathematical result to −8 through 7.',
    },
    {
      id: 'numbers-floating',
      title: 'Floating-point precision',
      summary: 'Understand exponent, significand, and rounding in binary floating point.',
      notes:
        'A binary floating-point value combines a sign, a significand, and a power of two. ' +
        'Precision is finite, so spacing increases at larger magnitudes. Fractions such as ' +
        '1/2 terminate in binary, while 1/10 repeats and must be rounded. Rounding after each' +
        ' operation can make different evaluation orders produce different results.',
      example:
        '0.101₂ = 1/2 + 0/4 + 1/8 = 0.625\n' +
        '1/10 has a factor of 5 in its denominator,\n' +
        'so no finite sum of powers of two equals it.',
      question: 'Which fraction is exact in a sufficiently wide binary format?',
      options: ['3/8', '1/10', '1/3'],
      correct: 0,
      explanation: '3/8 equals 0.011₂ and terminates.',
      hint: 'Look for a denominator that is a power of two.',
    },
  ],
  logic: [
    {
      id: 'logic-gates',
      title: 'Logic gates and truth tables',
      summary: 'Evaluate NOT, AND, OR, and XOR one input row at a time.',
      notes:
        'A truth table lists the output for each possible input combination. AND requires ' +
        'both inputs, OR allows either or both, and XOR requires different inputs. NOT flips ' +
        'one bit. Evaluate an expression from its innermost gates outward, and use ' +
        'intermediate columns to track each signal.',
      example:
        'A B  A XOR B  NOT(A XOR B)\n' +
        '0 0     0           1\n' +
        '0 1     1           0\n' +
        '1 0     1           0\n' +
        '1 1     0           1',
      question: 'When is NOT(A XOR B) true?',
      options: ['Only when both are 1', 'When A and B match', 'When A and B differ'],
      correct: 1,
      explanation: 'XOR is false for matching inputs, so its negation is true.',
      hint: 'Start by finding the rows where XOR is zero.',
    },
    {
      id: 'logic-combinational',
      title: 'Adders and multiplexers',
      summary: 'Trace carry between adder stages and select a signal with a multiplexer.',
      notes:
        'A combinational circuit has no stored state. A full adder produces a sum bit and a ' +
        'carry bit from two operand bits and a carry-in. A ripple-carry adder feeds each ' +
        'carry into the next more significant stage. A 2-to-1 multiplexer instead routes one ' +
        'data input to the output according to a select bit.',
      example:
        'Add binary 01 and 11:\n' +
        'low stage: 1 + 1 + 0 → sum 0, carry 1\n' +
        'high stage: 0 + 1 + 1 → sum 0, carry 1\n' +
        'include final carry: 100₂',
      question: 'What feeds a ripple-carry adder’s next stage?',
      options: [
        'The current stage’s sum bit',
        'The previous output word',
        'The current stage’s carry-out',
      ],
      correct: 2,
      explanation: 'The carry-out becomes carry-in for the next more significant bit.',
      hint: 'Think about how you carry a digit in pencil-and-paper addition.',
    },
    {
      id: 'logic-registers',
      title: 'Flip-flops and registers',
      summary: 'Follow stored state across clock edges.',
      notes:
        'An edge-triggered D flip-flop samples D at its active clock edge and holds the ' +
        'sampled value at Q between edges. Several flip-flops sharing a clock form a ' +
        'register. Combinational logic can compute the next state from current state and ' +
        'inputs, but the register updates only on a clock edge.',
      example:
        'Initial Q = 0\n' +
        'D becomes 1 before the rising edge: Q remains 0\n' +
        'Rising edge: Q becomes 1\n' +
        'D returns to 0 between edges: Q remains 1',
      question: 'When does Q change in this model?',
      options: [
        'At an active clock edge if D differs from Q',
        'Immediately whenever D changes',
        'On every transition of the data input',
      ],
      correct: 0,
      explanation: 'The flip-flop captures D only on its active clock edge.',
      hint: 'Separate the data input from the sampling event.',
    },
  ],
  c: [
    {
      id: 'c-functions',
      title: 'C values, loops, and functions',
      summary: 'Trace typed expressions, parameters, and loop bounds.',
      notes:
        'A C function declares its parameter types and return type. Arguments are passed by ' +
        'value, so assigning to an ordinary parameter does not modify the caller’s object. A ' +
        'for loop initializes once, tests before each iteration, and advances after each ' +
        'body. When both operands of division are integers, C discards the fractional part ' +
        'toward zero.',
      example:
        'int sum_to(int limit) {\n' +
        '    int sum = 0;\n' +
        '    for (int i = 1; i <= limit; ++i) sum += i;\n' +
        '    return sum;\n' +
        '}\n' +
        '// sum_to(3) visits 1, 2, 3 and returns 6.',
      question: 'What does 7 / 2 evaluate to in C?',
      options: ['3.5', '4', '3'],
      correct: 2,
      explanation: 'Both operands are integers, so the fractional part is discarded.',
      hint: 'Check the operand types before doing the division.',
    },
    {
      id: 'c-arrays',
      title: 'Arrays and pointer arithmetic',
      summary: 'Compute element addresses and identify valid bounds.',
      notes:
        'Array elements occupy contiguous storage. In most expressions an array becomes a ' +
        'pointer to its first element. Adding i to that pointer advances by i elements, not i' +
        ' bytes. Forming a pointer one past the array is allowed for loop bounds, but ' +
        'dereferencing it is undefined behavior.',
      example:
        'int values[4] = {10, 20, 30, 40};\n' +
        'int *p = values;\n' +
        '*(p + 2) == values[2]; // both are 30\n' +
        'p + 4; // one past the array; do not dereference',
      question: 'Which expression accesses the final element?',
      options: ['*(p + 3)', '*(p + 4)', '*(p + 2)'],
      correct: 0,
      explanation: 'A four-element array has valid indices 0 through 3.',
      hint: 'Start the index at zero.',
    },
    {
      id: 'c-allocation',
      title: 'Allocation and object lifetime',
      summary: 'Track ownership of dynamically allocated memory.',
      notes:
        'A local automatic object normally stops existing when its block ends. Dynamically ' +
        'allocated storage remains valid until released. Check that malloc succeeds before ' +
        'accessing it, and arrange for one owner to release it with free. Setting one pointer' +
        ' to NULL after free does not repair any other aliases to the same allocation.',
      example:
        'int *values = malloc(4 * sizeof *values);\n' +
        'if (values == NULL) return 1;\n' +
        'values[0] = 7;\n' +
        'free(values);\n' +
        'values = NULL;',
      question: 'What happens to another pointer to the allocation after free?',
      options: [
        'It automatically becomes NULL.',
        'It becomes invalid to dereference.',
        'It keeps the allocation alive.',
      ],
      correct: 1,
      explanation: 'Free ends the allocation’s lifetime for all pointers to it.',
      hint: 'Think about whether free can update unrelated pointer variables.',
    },
    {
      id: 'c-toolchain',
      title: 'Compiling, assembling, and linking',
      summary: 'Follow C source through the toolchain and identify unresolved symbols.',
      notes:
        'Preprocessing handles directives such as includes. Compilation translates C and can ' +
        'emit assembly. The assembler encodes instructions into object files, which may ' +
        'contain unresolved references. The linker combines object files and libraries and ' +
        'resolves those references into an executable. A header declaration allows a call to ' +
        'compile even when a required definition is missing at link time.',
      example:
        'cc -S main.c -o main.s   # emit assembly\n' +
        'cc -c main.s -o main.o   # assemble\n' +
        'cc main.o math.o -o demo # link definitions',
      question: 'Which stage reports a missing definition for a declared function?',
      options: ['Preprocessing', 'Execution of the first loop', 'Linking'],
      correct: 2,
      explanation: 'The linker must find a definition for a referenced external symbol.',
      hint: 'A declaration is sufficient to type-check the call.',
    },
  ],
  assembly: [
    {
      id: 'assembly-encoding',
      title: 'Machine instruction fields',
      summary: 'Identify opcode, register, and immediate fields in a RISC-V instruction.',
      notes:
        'The ISA defines how bits map to instructions. RV32I uses several 32-bit layouts, so ' +
        'the opcode helps determine which fields to decode. In an I-type arithmetic ' +
        'instruction, bits 31–20 encode an immediate, 19–15 encode rs1, 14–12 encode funct3, ' +
        '11–7 encode rd, and 6–0 encode the opcode. The immediate is sign-extended for addi.',
      example:
        'addi x5, x0, 7\n' +
        'imm       rs1   funct3 rd    opcode\n' +
        '000000000111 00000 000 00101 0010011\n' +
        'x5 receives 0 + 7.',
      question: 'Which field names the destination?',
      options: ['rd', 'rs1', 'imm'],
      correct: 0,
      explanation: 'rd selects the register that receives the result.',
      hint: 'Look for the field corresponding to x5.',
    },
    {
      id: 'assembly-addressing',
      title: 'Immediate and base-offset addressing',
      summary: 'Distinguish a constant operand from an address calculation.',
      notes:
        'Immediate operands come from bits in the instruction. Register operands come from ' +
        'the register file. A RISC-V load or store adds a signed byte displacement to a base ' +
        'register to compute an effective address. The same numeric literal can be an ' +
        'arithmetic operand in addi or a displacement in lw, depending on the instruction.',
      example:
        'Assume sp = 0x1000.\n' +
        'addi t0, sp, 12 → t0 receives 0x100C\n' +
        'lw   t0, 12(sp) → t0 receives the word at 0x100C',
      question: 'With sp = 0x1000, what address does lw t0, −4(sp) read?',
      options: ['0x1004', '0x0FFC', '0x0004'],
      correct: 1,
      explanation: 'The effective address is 0x1000 minus four bytes.',
      hint: 'Add the signed displacement to the base.',
    },
    {
      id: 'assembly-instruction-types',
      title: 'Loads, stores, and ALU instructions',
      summary: 'Trace how instruction families move and transform values.',
      notes:
        'A load reads memory into a register. A store writes a register’s value to memory. ' +
        'Register arithmetic and logic instructions operate on register values and write a ' +
        'register result. In a load/store ISA such as RV32I, use explicit loads and stores ' +
        'around arithmetic on values held in memory.',
      example:
        'lw   t0, 0(a0)    # load word from memory\n' +
        'addi t0, t0, 1   # increment in register\n' +
        'sw   t0, 0(a0)   # write result back',
      question: 'After lw and addi, but before sw, which value has changed?',
      options: ['The memory word only', 'Both t0 and the memory word', 'The register t0'],
      correct: 2,
      explanation: 'addi updates t0. Only the later store updates memory.',
      hint: 'Identify the instruction with memory as its destination.',
    },
  ],
  control: [
    {
      id: 'control-cycle',
      title: 'Fetch, decode, and execute',
      summary: 'Track the program counter, register file, and ALU through one instruction.',
      notes:
        'The program counter identifies the instruction to fetch. The decoder determines the ' +
        'operation and operands. The execution unit performs the operation or computes an ' +
        'address. A load then reads memory and writes a register result, while a store writes' +
        ' memory. For a straight-line 32-bit RV32I instruction, the next instruction is ' +
        'normally at PC + 4.',
      example:
        'PC = 0x100; instruction = add x5, x6, x7\n' +
        'Read x6 = 4 and x7 = 9\n' +
        'ALU adds 4 + 9; write x5 = 13\n' +
        'Next PC = 0x104',
      question: 'Which stage interprets the opcode?',
      options: ['Fetch', 'Decode', 'Write-back'],
      correct: 1,
      explanation: 'Decode turns instruction bits into operation and operand choices.',
      hint: 'Fetching retrieves bits before interpreting them.',
    },
    {
      id: 'control-branches',
      title: 'Branches, jumps, and loops',
      summary: 'Trace taken and untaken control transfers.',
      notes:
        'A conditional branch compares operands and chooses between the target and the next ' +
        'sequential instruction. An unconditional jump always transfers control. A loop can ' +
        'jump backward until its condition fails. Trace the order of register updates and ' +
        'comparisons to catch off-by-one errors.',
      example:
        'li t0, 3\n' +
        'loop:\n' +
        '  addi t0, t0, -1\n' +
        '  bne t0, zero, loop\n' +
        '# Tests see 2, 1, and 0; the final branch falls through.',
      question: 'How many times is the branch taken?',
      options: ['3', '1', '2'],
      correct: 2,
      explanation: 'The tests at 2 and 1 take the branch. The test at 0 falls through.',
      hint: 'Separate the number of tests from the number of taken branches.',
    },
    {
      id: 'control-calls',
      title: 'Function calls and stack frames',
      summary: 'Follow return addresses and saved registers across nested calls.',
      notes:
        'A calling convention assigns registers for arguments and results and identifies ' +
        'which registers a callee must restore. A call records a return address. If a ' +
        'function calls another function using the same return-address register, it must ' +
        'preserve its own return address, commonly in its stack frame. Stack frames can also ' +
        'hold local storage and saved registers.',
      example:
        'main calls f → ra holds return to main\n' +
        'f saves ra on the stack and calls g\n' +
        'g returns to f\n' +
        'f restores ra and returns to main',
      question: 'Why does f save ra before calling g?',
      options: [
        'Calling g overwrites f’s return address register.',
        'The stack changes the address of main.',
        'g needs f’s return address as its first argument.',
      ],
      correct: 0,
      explanation:
        'The nested call writes a new return address to ra. f still needs the old value to ' +
        'return to main.',
      hint: 'Track the value in ra immediately after each call.',
    },
    {
      id: 'control-performance',
      title: 'Pipelining and CPU time',
      summary: 'Distinguish instruction latency, throughput, and stalls.',
      notes:
        'A pipeline overlaps stages of different instructions to increase throughput. A ' +
        'dependency may require forwarding or a stall, and a wrong branch prediction may ' +
        'discard work. CPU time is instruction count times average cycles per instruction ' +
        'divided by clock rate. Clock rate alone cannot predict the faster implementation.',
      example:
        '2 million instructions × 1.5 cycles/instruction\n' +
        '= 3 million cycles\n' +
        'At 2 GHz: 3 million / 2 billion = 1.5 ms',
      question:
        'What is the effect of additional stalls at fixed instruction count and clock rate?',
      options: [
        'Clock rate rises automatically.',
        'Average CPI and CPU time rise.',
        'Instruction count drops.',
      ],
      correct: 1,
      explanation: 'Stalls consume cycles without retiring extra instructions.',
      hint: 'CPU time is proportional to total cycles.',
    },
  ],
  cache: [
    {
      id: 'cache-locality',
      title: 'Memory hierarchy and locality',
      summary: 'Predict how access order affects reuse of cached data.',
      notes:
        'Registers and caches are small and fast, while main memory is larger and slower. ' +
        'Caches transfer blocks containing multiple adjacent bytes. Temporal locality means ' +
        'reusing the same item soon. Spatial locality means touching nearby items soon. ' +
        'Scanning a C array in order uses bytes fetched together in the same block.',
      example:
        'With 16-byte blocks and aligned 4-byte integers:\n' +
        'Read a[0] → block holds a[0] through a[3]\n' +
        'Read a[1], a[2], a[3] → reuse that block\n' +
        'Read a[4] → next block',
      question: 'Which pattern illustrates spatial locality?',
      options: [
        'Repeatedly reading the same element',
        'Reading one element from each distant block',
        'Reading consecutive array elements',
      ],
      correct: 2,
      explanation:
        'Adjacent elements can share a cache block, so sequential accesses reuse the fetched ' +
        'block.',
      hint: 'Spatial refers to nearby addresses.',
    },
    {
      id: 'cache-mapping',
      title: 'Cache tags, indices, and offsets',
      summary: 'Calculate the line index and tag in a direct-mapped cache.',
      notes:
        'The block offset selects a byte within a cache block. The index selects one cache ' +
        'line in a direct-mapped cache. The tag records which memory block currently occupies' +
        ' that line. A matching valid tag produces a hit. Two different blocks with the same ' +
        'index can evict one another even when other lines are empty.',
      example:
        '4 lines, 16 bytes per line:\n' +
        '0x34 → block 3, index 3, tag 0, offset 4\n' +
        '0x74 → block 7, index 3, tag 1, offset 4\n' +
        'These blocks compete for line 3.',
      question: 'With 16-byte blocks, how many offset bits are needed?',
      options: ['4', '2', '16'],
      correct: 0,
      explanation: 'Four bits encode byte offsets 0 through 15.',
      hint: 'Find log₂ of the block size.',
    },
    {
      id: 'cache-io',
      title: 'Polling, interrupts, and DMA',
      summary: 'Compare how a CPU learns about device events and moves data.',
      notes:
        'Polling repeatedly reads a device status register. Interrupts notify the CPU when an' +
        ' event needs service, avoiding constant checks during long waits. DMA lets a ' +
        'controller transfer a block between a device and memory after setup by the CPU. A ' +
        'completion interrupt can notify software that the transfer is ready.',
      example:
        'Disk driver prepares a buffer and starts DMA.\n' +
        'The controller transfers the block into memory.\n' +
        'A completion interrupt lets the driver check status.',
      question: 'Which mechanism transfers the block without a CPU instruction for each byte?',
      options: ['Polling', 'DMA', 'An interrupt alone'],
      correct: 1,
      explanation: 'DMA performs the data movement. An interrupt can separately signal completion.',
      hint: 'Separate notification from transfer.',
    },
  ],
  processes: [
    {
      id: 'processes-system-calls',
      title: 'System calls and kernel mode',
      summary: 'Trace a protected request from user code to the kernel.',
      notes:
        'User code runs with limited privileges. A system call uses a controlled entry point ' +
        'to request kernel work such as reading a file descriptor. The kernel validates ' +
        'arguments, performs or waits for the operation, and returns a result. A C library ' +
        'wrapper can report errors through a return value and errno. Not every library ' +
        'function enters the kernel.',
      example:
        'ssize_t count = read(fd, buffer, sizeof buffer);\n' +
        'count > 0: bytes received\n' +
        'count == 0: end of file or stream\n' +
        'count == -1: inspect errno',
      question: 'Does a positive read result always equal the requested byte count?',
      options: [
        'No, a successful read can be short.',
        'Yes, unless errno is set.',
        'Yes, whenever the descriptor is open.',
      ],
      correct: 0,
      explanation:
        'Use the returned count to determine how many bytes the kernel actually supplied.',
      hint: 'The size argument is an upper bound.',
    },
    {
      id: 'processes-lifecycle',
      title: 'Fork, exec, and wait',
      summary: 'Follow parent and child control flow through program launch.',
      notes:
        'fork creates a child that resumes after the call. It returns zero in the child and ' +
        'the child PID in the parent, or −1 on failure. exec replaces the calling process ' +
        'image and only returns if it fails. waitpid lets the parent collect a child’s exit ' +
        'status and reap it.',
      example:
        'pid = fork();\n' +
        'if (pid == 0) { execvp(argv[0], argv); _exit(127); }\n' +
        'else if (pid > 0) { waitpid(pid, &status, 0); }\n' +
        '// Handle fork, exec, and wait errors in a full program.',
      question: 'Which operation replaces the child’s program without creating another process?',
      options: ['fork', 'execvp', 'waitpid'],
      correct: 1,
      explanation: 'A successful exec keeps the process identity and replaces the program image.',
      hint: 'Look for the operation that never returns on success.',
    },
    {
      id: 'processes-scheduling',
      title: 'Process states and context switches',
      summary: 'Tell runnable work from work blocked on an event.',
      notes:
        'A running thread occupies a CPU. A runnable thread is ready to run but may be ' +
        'waiting for a CPU. A blocked thread is waiting for an event such as I/O completion. ' +
        'A scheduler selects runnable work, and a context switch saves and restores execution' +
        ' state so a thread can resume later.',
      example:
        'A runs and requests blocking disk I/O.\n' +
        'A becomes blocked; scheduler runs B.\n' +
        'Disk completes; A becomes runnable.\n' +
        'The scheduler can later select A.',
      question: 'Does I/O completion guarantee that A immediately runs?',
      options: [
        'Yes, every completion immediately switches to A.',
        'No, A stays blocked until it calls fork.',
        'No, it makes A eligible to be scheduled.',
      ],
      correct: 2,
      explanation: 'Completion makes the thread runnable. The scheduler decides when it runs.',
      hint: 'Runnable and running are distinct states.',
    },
  ],
  virtual: [
    {
      id: 'virtual-translation',
      title: 'Pages, frames, and address translation',
      summary: 'Split a virtual address and use a page table entry.',
      notes:
        'Paging divides a virtual address into a page number and a byte offset. The page ' +
        'table maps the page number to a physical frame and records permissions. Translation ' +
        'replaces the page number with the frame number and preserves the offset. Page size ' +
        'determines how many low bits make up that offset.',
      example:
        '4 KiB pages: 12 offset bits\n' +
        'VA 0x5ABC → page 5, offset 0xABC\n' +
        'Page 5 maps to frame 9\n' +
        'PA = 0x9ABC',
      question: 'If page 2 maps to frame 7, where does 0x2345 translate?',
      options: ['0x7234', '0x7345', '0x2347'],
      correct: 1,
      explanation: 'With 4 KiB pages, preserve the low three hex digits and use frame 7.',
      hint: 'Keep offset 0x345 unchanged.',
    },
    {
      id: 'virtual-tlb',
      title: 'TLB misses and page faults',
      summary: 'Distinguish a translation cache miss from an OS exception.',
      notes:
        'A TLB caches recent page translations, including relevant permissions. A TLB miss ' +
        'can be handled by finding a valid page table entry and caching it. A page fault ' +
        'occurs when access needs operating system intervention, for example when a valid ' +
        'virtual page has no physical frame yet. Invalid addresses or disallowed accesses may' +
        ' instead be rejected.',
      example:
        'Read address on page 4; TLB lookup misses.\n' +
        'The page table entry is present and readable.\n' +
        'Cache its translation and continue the read.',
      question: 'Did the described TLB miss require a page fault?',
      options: [
        'Yes, every TLB miss faults.',
        'Yes, because the address was virtual.',
        'No, the page table entry already permits the access.',
      ],
      correct: 2,
      explanation: 'A cache miss alone does not imply the page is absent or inaccessible.',
      hint: 'Check the page table entry before deciding.',
    },
    {
      id: 'virtual-demand',
      title: 'Demand paging and replacement',
      summary: 'Follow first access to a page and eviction under memory pressure.',
      notes:
        'Demand paging creates or loads a page when it is first accessed. The OS may reclaim ' +
        'a frame if memory is full. A modified page may need writeback before the frame can ' +
        'be reused, while an unmodified file-backed page can generally be loaded again from ' +
        'its file. Frequent faults can dominate execution time.',
      example:
        'Process first touches a valid demand-zero page.\n' +
        'A fault hands control to the OS.\n' +
        'The OS installs a zeroed frame and retries the access.',
      question: 'What must the OS preserve when evicting modified data that is still needed?',
      options: ['The modified page contents', 'Only the virtual page number', 'Only the TLB entry'],
      correct: 0,
      explanation: 'The next access must recover the modified bytes, so needed data must be saved.',
      hint: 'Consider what would be lost if the frame were reused.',
    },
  ],
  ipc: [
    {
      id: 'ipc-pipes',
      title: 'Pipes and end of file',
      summary: 'Trace descriptor inheritance and identify why readers block.',
      notes:
        'A pipe is a kernel byte stream with read and write ends. After fork both processes ' +
        'inherit descriptors. Each process closes ends it will not use. A reader can observe ' +
        'EOF only after buffered bytes are consumed and every descriptor referring to the ' +
        'write end has been closed.',
      example:
        'Parent creates a pipe and forks.\n' +
        'Child closes its write end and reads.\n' +
        'Parent closes its read end, writes, then closes its write end.\n' +
        'After consuming the bytes, the child sees EOF.',
      question: 'What happens if the child keeps its write end open?',
      options: [
        'The child immediately sees EOF.',
        'The OS silently closes it after one read.',
        'The read may block after all bytes are consumed.',
      ],
      correct: 2,
      explanation: 'The remaining writer reference prevents EOF even if no one plans to write.',
      hint: 'Count write-end references in both processes.',
    },
    {
      id: 'ipc-shared',
      title: 'Shared memory and coordination',
      summary: 'Distinguish sharing bytes from coordinating access to them.',
      notes:
        'Shared memory maps the same underlying storage into multiple processes. The virtual ' +
        'addresses can differ, so a raw pointer stored by one process may be meaningless to ' +
        'another. Use offsets for references within the region and process-shared ' +
        'synchronization to coordinate writes and establish when data can be read.',
      example:
        'Process A maps the region at 0x1000.\n' +
        'Process B maps it at 0x9000.\n' +
        'Offset 0x40 refers to the same shared bytes in both.',
      question: 'What should A store so B can find that item?',
      options: ['Offset 0x40', 'Pointer 0x1040', 'Pointer to A’s stack'],
      correct: 0,
      explanation: 'Both processes can add the same offset to their respective mapping bases.',
      hint: 'The shared region does not have to be mapped at the same virtual address.',
    },
    {
      id: 'ipc-messages',
      title: 'Message queues and stream boundaries',
      summary: 'Choose an IPC model based on message framing and blocking behavior.',
      notes:
        'A message queue carries separate messages. A pipe carries an ordered stream of ' +
        'bytes, so a reader must use an agreed framing rule to recover application records. A' +
        ' receive can block while waiting for data. Choose IPC based on whether you need ' +
        'message boundaries, high-throughput shared state, or a simple producer-to-consumer ' +
        'stream.',
      example:
        'Two logical records in a pipe: cat and dog\n' +
        'One read may obtain catdog or just ca.\n' +
        'A length prefix or delimiter lets the reader reconstruct the records.',
      question: 'Which model preserves message boundaries by design?',
      options: ['A pipe byte stream', 'A message queue', 'An unprotected shared array'],
      correct: 1,
      explanation: 'A queue can deliver each sent message as a distinct unit.',
      hint: 'Ask whether the transport moves records or bytes.',
    },
  ],
  sync: [
    {
      id: 'sync-mutexes',
      title: 'Races and mutexes',
      summary: 'Identify a critical section around a read-modify-write.',
      notes:
        'Incrementing a shared counter entails reading, adding, and writing. Two threads can ' +
        'read the same old value and lose one update. In C, unsynchronized conflicting ' +
        'accesses to a non-atomic object also constitute a data race with undefined behavior.' +
        ' Guard every access to the shared invariant with the same mutex, or use an ' +
        'appropriate atomic design.',
      example:
        'Initial count = 10\n' +
        'A reads 10; B reads 10\n' +
        'A writes 11; B writes 11\n' +
        'Expected after both increments: 12',
      question: 'What must the mutex protect?',
      options: [
        'The entire read-modify-write',
        'Only the final store',
        'Only the arithmetic operation',
      ],
      correct: 0,
      explanation:
        'Protecting just the store still allows both threads to compute from the same stale ' +
        'value.',
      hint: 'Identify all steps that must act as one operation.',
    },
    {
      id: 'sync-conditions',
      title: 'Condition variables and semaphores',
      summary: 'Choose between waiting for a predicate and waiting for a permit.',
      notes:
        'A condition variable lets a thread sleep until shared state may have changed. Wait ' +
        'while holding the mutex, and recheck the predicate in a loop after the wait ' +
        'reacquires it. Waking does not guarantee the state still satisfies the predicate. A ' +
        'semaphore instead maintains a count of permits that threads acquire and release.',
      example:
        'pthread_mutex_lock(&lock);\n' +
        'while (count == 0) pthread_cond_wait(&ready, &lock);\n' +
        '// Consume one item while holding the lock.\n' +
        'pthread_mutex_unlock(&lock);',
      question: 'Why use while around the condition wait?',
      options: [
        'The mutex is never reacquired after waiting.',
        'The predicate may be false again when the thread reacquires the lock.',
        'The condition variable counts every item.',
      ],
      correct: 1,
      explanation:
        'Another consumer could remove the item first, and wakeups can also occur without a ' +
        'signal.',
      hint: 'A wakeup tells the thread to check again.',
    },
    {
      id: 'sync-deadlock',
      title: 'Deadlock and lock ordering',
      summary: 'Draw a wait cycle and prevent it with a consistent order.',
      notes:
        'Deadlock can occur when threads hold resources while waiting for resources others ' +
        'hold, and the waits form a cycle. The four classic conditions are mutual exclusion, ' +
        'hold and wait, no preemption, and circular wait. Give locks a global order and ' +
        'acquire them in that order to prevent cycles.',
      example:
        'Thread 1 holds A and waits for B.\n' +
        'Thread 2 holds B and waits for A.\n' +
        'Require A before B in both code paths.',
      question: 'Which change removes the circular wait?',
      options: [
        'Sleep before requesting the second lock.',
        'Use two distinct names for the locks.',
        'Always acquire A before B.',
      ],
      correct: 2,
      explanation: 'A total acquisition order makes it impossible to close a wait cycle.',
      hint: 'A thread holding B should never wait to acquire A.',
    },
  ],
  parallel: [
    {
      id: 'parallel-partition',
      title: 'Thread creation, partitioning, and joins',
      summary: 'Divide independent work and safely collect results.',
      notes:
        'Threads share the process address space, so workers can read the same immutable ' +
        'input. Assign disjoint index ranges to avoid duplicate work and keep partial results' +
        ' separate. Join each worker before reading its final result or freeing its inputs. ' +
        'Use half-open ranges to make adjacent partitions meet without overlap.',
      example:
        'Worker 0 handles indices [0, 5).\n' +
        'Worker 1 handles indices [5, 10).\n' +
        'Join both workers, then add their partial sums.',
      question: 'Which worker processes index 5?',
      options: ['Both workers', 'Worker 1 only', 'Neither worker'],
      correct: 1,
      explanation: 'A half-open range includes its start and excludes its end.',
      hint: 'Look at the bracket on the right of each range.',
    },
    {
      id: 'parallel-speedup',
      title: 'Amdahl’s law and speedup',
      summary: 'Calculate the upper bound imposed by serial work.',
      notes:
        'For a fixed workload with serial fraction s and N workers, ideal normalized runtime ' +
        'is s + (1−s)/N. The ideal speedup is the reciprocal. As N grows, the parallel ' +
        'portion tends toward zero but serial work remains. Thread creation, contention, and ' +
        'memory bandwidth can reduce real speedup further.',
      example:
        '20% serial, 4 workers:\n' + 'T = 0.20 + 0.80/4 = 0.40\n' + 'Ideal speedup = 1/0.40 = 2.5×',
      question: 'If 10% of work is serial, what is the ideal limit as workers increase?',
      options: ['100×', 'Unlimited', '10×'],
      correct: 2,
      explanation:
        'The normalized runtime cannot be less than 0.10, so speedup is bounded by its ' +
        'reciprocal.',
      hint: 'Let the parallel term approach zero.',
    },
    {
      id: 'parallel-contention',
      title: 'Contention and false sharing',
      summary: 'Explain how shared hardware can limit independent workers.',
      notes:
        'Lock contention makes workers wait to enter the same critical section. False sharing' +
        ' can occur without a shared variable: threads update different variables on the same' +
        ' cache line, and cache coherence repeatedly transfers ownership of that line. Local ' +
        'accumulation followed by one merge reduces writes to shared lines and can reduce ' +
        'lock traffic.',
      example:
        'Two threads update neighboring per-thread counters.\n' +
        'The counters occupy the same cache line.\n' +
        'Keeping totals local until the end cuts coherence traffic.',
      question: 'Can false sharing occur when threads write different variables?',
      options: [
        'Yes, if the variables occupy one cache line.',
        'No, it requires the same variable.',
        'Only if both threads hold a mutex.',
      ],
      correct: 0,
      explanation: 'Coherence operates on cache lines, not individual variables.',
      hint: 'Think about the unit that a cache transfers.',
    },
  ],
  network: [
    {
      id: 'network-sockets',
      title: 'TCP sockets and connection setup',
      summary: 'Trace client and server roles from socket creation through accept.',
      notes:
        'A TCP server creates a socket, binds a local address, listens, and accepts ' +
        'connections. A client connects to the server address. accept returns a connected ' +
        'socket for one client. The listening socket remains available to accept more ' +
        'clients. Closing the accepted socket ends that connection without closing the ' +
        'listener.',
      example:
        'Server: socket → bind → listen → accept\n' +
        'Client: socket → connect\n' +
        'Server uses the accepted descriptor for send and recv.',
      question: 'Which descriptor sends data to an accepted client?',
      options: [
        'The listening socket',
        'The server’s port number',
        'The connected socket returned by accept',
      ],
      correct: 2,
      explanation: 'Each accepted connection has its own descriptor for data transfer.',
      hint: 'Separate the socket that listens from the one that communicates.',
    },
    {
      id: 'network-framing',
      title: 'TCP byte streams and framing',
      summary: 'Handle short reads and reconstruct complete messages.',
      notes:
        'TCP delivers ordered bytes, with no application message boundaries. A single recv ' +
        'can return less than one message or bytes from several messages. Use a fixed length,' +
        ' delimiter, or length prefix. Validate lengths before allocating and loop until the ' +
        'expected count is read, handling errors and EOF mid-message.',
      example:
        'Protocol: four-byte length in network byte order.\n' +
        'Bytes 00 00 00 05 announce a five-byte payload.\n' +
        'The payload may arrive as two bytes then three bytes.',
      question: 'What does one successful recv call guarantee?',
      options: [
        'Only that the returned number of bytes were read.',
        'That exactly one send was received.',
        'That a complete application message arrived.',
      ],
      correct: 0,
      explanation:
        'The receive count describes a chunk of an ordered stream. Framing determines message' +
        ' completeness.',
      hint: 'Do not assume send and recv calls line up.',
    },
    {
      id: 'network-udp',
      title: 'UDP datagrams and TCP tradeoffs',
      summary: 'Compare delivery guarantees and identify when to use either transport.',
      notes:
        'UDP sends independent datagrams and preserves datagram boundaries when received with' +
        ' sufficient buffer space. It does not guarantee delivery, ordering, or duplicate ' +
        'suppression. TCP provides a reliable ordered byte stream with connection setup and ' +
        'retransmission. Choose based on whether timely updates or complete ordered delivery ' +
        'matters more.',
      example:
        'Live position updates can carry a sequence number.\n' +
        'If a newer update arrives first, ignore an older one.\n' +
        'A file transfer needs all bytes in order, so TCP is a natural fit.',
      question: 'Which statement describes UDP?',
      options: [
        'It guarantees in-order delivery.',
        'It preserves datagram boundaries but may lose datagrams.',
        'It is a reliable byte stream.',
      ],
      correct: 1,
      explanation: 'UDP preserves datagram structure but does not promise that a datagram arrives.',
      hint: 'Separate the unit of delivery from delivery guarantees.',
    },
  ],
};
