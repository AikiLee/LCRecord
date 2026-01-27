# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in the LCRecord repository.

## Repository Overview

LCRecord is a LeetCode problem-solving repository containing solutions in JavaScript, TypeScript, and Python. Each file follows the LeetCode format with problem metadata and solution implementations.

## Build/Test Commands

### JavaScript/TypeScript
- **Run single file**: `node filename.js` or `node filename.ts` (if compiled)
- **TypeScript compilation**: Use the tsconfig.json configuration with `tsc filename.ts`
- **Debug**: Use VS Code debug configuration (Python: Current File, Python: Remote Attach)

### Python
- **Run single file**: `python filename.py` or `py filename.py`
- **Debug with VS Code**: Use "Python: Current File" configuration
- **Remote debug**: Use "Python: Remote Attach" on port 5678

### General Testing
- Most files include console.log statements with expected outputs for manual verification
- Test cases are embedded in the problem description comments
- Use the provided test examples in the LeetCode metadata

## Code Style Guidelines

### File Naming Convention
- Format: `{problem_number}.{problem_name}.{extension}`
- Example: `763.划分字母区间.ts`, `84.柱状图中最大的矩形.js`
- Use Chinese problem names as shown in LeetCode CN
- Use `.ts` for TypeScript, `.js` for JavaScript, `.py` for Python

### LeetCode Format Requirements
All solution files must follow the LeetCode template structure:

```javascript
/*
 * @lc app=leetcode.cn id={problem_id} lang={language}
 *
 * [{problem_id}] {problem_name}
 *
 * https://leetcode.cn/problems/{slug}/description/
 *
 * algorithms
 * {difficulty} ({acceptance_rate}%)
 * Likes:    {likes}
 * Dislikes: 0
 * Total Accepted:    {total_accepted}
 * Total Submissions: {total_submissions}
 * Testcase Example:  '{test_case}'
 *
 * {problem_description}
 *
 *
 *
 * {constraints}
 *
 *
 *
 */

// @lc code=start
{solution_code}
// @lc code=end
console.log({function_call}({test_input})); //expected {expected_output}
```

### Import/Export Guidelines
- **JavaScript**: Use function declarations, avoid ES6 modules unless necessary
- **TypeScript**: Use proper type annotations, function declarations preferred
- **Python**: Use standard imports, avoid unnecessary dependencies

### Code Organization
1. **Comments Section**: Include thought process and algorithm explanation
2. **Implementation**: Clean, readable solution code
3. **Testing**: Console.log with expected output for verification
4. **Commented Code**: Keep alternative approaches commented for reference

### TypeScript Specific Rules
- Use explicit type annotations for function parameters and return values
- Follow the existing tsconfig.json settings (target: es5, module: commonjs)
- Use `const` and `let` instead of `var`
- Prefer array methods over traditional loops when appropriate

### JavaScript Specific Rules
- Use `var` for function declarations (as seen in existing codebase)
- Use modern array methods and ES6+ features when appropriate
- Maintain consistency with existing code style

### Python Specific Rules
- Use snake_case for variable and function names
- Include type hints when beneficial for clarity
- Use list comprehensions and functional programming patterns appropriately
- Follow PEP 8 style guidelines

### Error Handling
- Include input validation where necessary
- Handle edge cases explicitly
- Use meaningful error messages
- Consider time and space complexity constraints

### Algorithm Documentation
- Include time and space complexity analysis in comments
- Explain the approach (greedy, DP, two pointers, etc.)
- Document any optimizations or alternative approaches
- Keep commented code for reference with clear explanations

### Testing Guidelines
- Always include test cases from the problem description
- Add edge case testing when appropriate
- Use console.log statements with expected outputs
- Test with multiple inputs when the problem allows

### Code Quality Standards
- Write clean, readable, and maintainable code
- Use meaningful variable names
- Avoid unnecessary complexity
- Follow existing patterns in the codebase
- Ensure solutions are efficient and meet LeetCode constraints

## Development Environment

### VS Code Configuration
- Python interpreter: `C:\Users\15869\AppData\Local\Python\bin\python.exe`
- Debug configurations available for Python files
- Tasks configured for remote debugging on port 5678

### TypeScript Configuration
- Target: ES5
- Module: CommonJS
- Output directory: `out`
- Source maps enabled

## Notes for Agents
- This is a learning repository for algorithm practice
- Focus on correctness and efficiency
- Maintain the LeetCode format strictly
- Include comprehensive comments explaining the approach
- Test solutions thoroughly before considering them complete
- When improving existing solutions, keep the original approach commented for learning purposes