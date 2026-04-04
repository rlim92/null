import type { ElementType } from '../types'
import { ELEMENTS, ELEMENT_ORDER } from './elements'
import { PROJECTS } from './projects'

interface CommandResult {
  lines: string[]
  color?: string
  action?: { type: 'setElement'; value: ElementType } | { type: 'clear' }
}

const FORTUNES = [
  '"Any fool can write code that a computer can understand. Good programmers write code that humans can understand." — Martin Fowler',
  '"First, solve the problem. Then, write the code." — John Johnson',
  '"The best error message is the one that never shows up." — Thomas Fuchs',
  '"Code is like humor. When you have to explain it, it\'s bad." — Cory House',
  '"Simplicity is the soul of efficiency." — Austin Freeman',
  '"Make it work, make it right, make it fast." — Kent Beck',
  '"Programs must be written for people to read, and only incidentally for machines to execute." — Abelson & Sussman',
  '"The most disastrous thing that you can ever learn is your first programming language." — Alan Kay',
  '"Talk is cheap. Show me the code." — Linus Torvalds',
  '"Debugging is twice as hard as writing the code in the first place." — Brian Kernighan',
]

function getNeofetch(element: ElementType): string[] {
  const el = ELEMENTS[element]

  const asciiArt: Record<ElementType, string[]> = {
    fire: [
      '       (  .      )',
      '      )           (',
      '            .  )  .',
      '     (.   )  (   )',
      '   .-\'\'\'\'\'\'\'\'\'\'-.  ',
      '  /             \\ ',
      ' |    VOLCANO    |',
      '  \\             / ',
      '   \'-..........\'  ',
    ],
    water: [
      '        ___       ',
      '    .-\'     \'-.   ',
      '   /           \\  ',
      '  |   TSUNAMI   | ',
      '  |             |  ',
      '   \\           /  ',
      '    \'-.     .-\'   ',
      '   ~~~~\\~/~~~~    ',
      '    ~~~~~~~~~     ',
    ],
    lightning: [
      '      /\\          ',
      '     /  \\    /\\   ',
      '    /        \\    ',
      '   / SUPERCELL\\  ',
      '  /     ||     \\ ',
      ' /______||______\\',
      '    \\  ||||  /   ',
      '     \\ |||| /    ',
      '      \\||||/     ',
    ],
    wind: [
      '     ___/\\_/\\     ',
      '    /          \\   ',
      '   /  TORNADO   \\  ',
      '  |              | ',
      '  |   ~~~~~~~~   |  ',
      '   \\  ~~~~~~~~ /  ',
      '    \\  ~~~~~~ /   ',
      '     \\///////    ',
      '      ~~~~~~     ',
    ],
    void: [
      '      .::::.      ',
      '    .::::::::.    ',
      '   :::        ::: ',
      '  ::::  NULL  ::::',
      '  :::  /\\/\\/\\  :::',
      '  ::: < @  @ > :::',
      '  :::  \\~~/ :::   ',
      '    \'::::::::::\'  ',
      '      \'::::\'      ',
    ],
  }

  const art = asciiArt[element]

  return [
    '',
    ...art.map((line, i) => {
      const info = [
        `OS: null v1.0.0`,
        `Shell: elemental-bash`,
        `Theme: ${el.name}`,
        `Projects: ${PROJECTS.length}`,
        `Stack: React + TypeScript`,
        `Build: Vite`,
        `CSS: Tailwind v4`,
        `Uptime: always shipping`,
        `Memory: caffeinated`,
      ]
      return line + (info[i] ? `   ${info[i]}` : '')
    }),
    '',
  ]
}

export function executeCommand(
  input: string,
  currentElement: ElementType
): CommandResult {
  const trimmed = input.trim().toLowerCase()
  const [cmd, ...args] = trimmed.split(/\s+/)

  switch (cmd) {
    case 'help':
      return {
        lines: [
          '',
          'Available commands:',
          '',
          '  help          Show this help message',
          '  about         Who is Rich?',
          '  projects      View projects',
          '  skills        View skills',
          '  contact       Get in touch',
          '  theme <el>    Switch element (fire|water|lightning|wind|void)',
          '  neofetch      System info',
          '  fortune       Random wisdom',
          '  clear         Clear terminal',
          '',
          '  ...and a few secrets. Try things.',
          '',
        ],
      }

    case 'about':
      return {
        lines: [
          '',
          '  Rich — Software Engineer',
          '',
          '  Still figuring things out, one project at a time.',
          '  I like building stuff, breaking stuff, and occasionally',
          '  shipping stuff that works.',
          '',
          '  Currently using: TypeScript, React, Python, Node.js',
          '',
        ],
      }

    case 'projects':
      return {
        lines: [
          '',
          '  Projects:',
          '',
          ...PROJECTS.map(
            (p) => `  ${p.title.padEnd(12)} ${p.subtitle}`
          ),
          '',
          '  Click the markers on the map to explore each project.',
          '',
        ],
      }

    case 'skills':
      return {
        lines: [
          '',
          '  Skills by project:',
          '',
          ...PROJECTS.flatMap((p) => [
            `  ${p.title.padEnd(12)} ${p.tech.join(', ')}`,
          ]),
          '',
        ],
      }

    case 'contact':
      return {
        lines: [
          '',
          '  Reach out:',
          '',
          '  GitHub:   github.com/rlim92',
          '  LinkedIn: linkedin.com/in/richard-lim-7100a4a7',
          '  Email:    richardlim92@gmail.com',
          '',
        ],
      }

    case 'theme': {
      const target = args[0] as ElementType | undefined
      if (!target || !ELEMENT_ORDER.includes(target)) {
        return {
          lines: [
            '',
            `  Current theme: ${ELEMENTS[currentElement].name}`,
            '',
            `  Usage: theme <element>`,
            `  Options: ${ELEMENT_ORDER.join(', ')}`,
            '',
          ],
        }
      }
      return {
        lines: [
          '',
          `  Switching to ${ELEMENTS[target].name}...`,
          `  "${ELEMENTS[target].tagline}"`,
          '',
        ],
        action: { type: 'setElement', value: target },
      }
    }

    case 'neofetch':
      return { lines: getNeofetch(currentElement) }

    case 'fortune':
      return {
        lines: [
          '',
          `  ${FORTUNES[Math.floor(Math.random() * FORTUNES.length)]}`,
          '',
        ],
      }

    case 'clear':
      return { lines: [], action: { type: 'clear' } }

    // Easter eggs
    case 'sudo':
      return {
        lines: ['', '  Nice try. You do not have root access to this portfolio.', ''],
        color: '#ff4500',
      }

    case 'rm':
      return {
        lines: ['', '  Permission denied. Nice try though.', ''],
        color: '#a0a0a0',
      }

    case 'hack':
      return {
        lines: [
          '',
          '  Initiating hack sequence...',
          '  Bypassing firewall...',
          '  Accessing database...',
          '  ...',
          '  Just kidding. Have a cookie instead. 🍪',
          '',
        ],
      }

    case 'whoami':
      return {
        lines: ['', '  visitor', ''],
      }

    case 'ls':
      return {
        lines: [
          '',
          '  volcano/  tsunami/  supercell/  tornado/  README.md',
          '',
        ],
      }

    case 'cat':
      if (args[0] === 'readme.md' || args[0] === 'README.md') {
        return {
          lines: [
            '',
            '  # null',
            '',
            '  A portfolio built with React, TypeScript, and Tailwind.',
            '  By Rich, Software Engineer.',
            '',
            '  Each project is themed around a natural force.',
            '  Switch elements with "theme <element>" to explore.',
            '',
          ],
        }
      }
      return { lines: ['', `  cat: ${args[0] || '???'}: No such file.`, ''] }

    case 'pwd':
      return { lines: ['', '  /home/rich/null', ''] }

    case 'cd':
      return { lines: ['', '  There is no escape. You are exactly where you need to be.', ''] }

    case 'exit':
      return { lines: ['', '  There is no exit. Only more code to write.', ''] }

    case 'hello':
    case 'hi':
      return { lines: ['', '  Hello! Welcome to my portfolio.', ''] }

    case 'rich':
      return {
        lines: [
          '',
          '  You have summoned the developer.',
          '  He nods approvingly.',
          '',
        ],
      }

    case 'matrix':
      return {
        lines: [
          '',
          '  Wake up, Rich...',
          '  The Matrix has you...',
          '  Follow the white rabbit.',
          '',
          '  01001110 01010101 01001100 01001100',
          '',
        ],
        color: '#00ff00',
      }

    case 'ping':
      return { lines: ['', '  pong 🏓', ''] }

    case 'date':
      return { lines: ['', `  ${new Date().toString()}`, ''] }

    case '':
      return { lines: [] }

    default:
      return {
        lines: [
          '',
          `  Command not found: ${cmd}`,
          '  Type "help" for available commands.',
          '',
        ],
        color: '#ff6347',
      }
  }
}
