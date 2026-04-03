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
  '"The void does not judge your code. It consumes it." — Ancient Proverb',
  '"In the land of the fire nation, every bug is fuel for the forge." — Unknown',
  '"Water teaches us: find the path of least resistance, then flow." — Hydro Sage',
  '"Lightning strikes once. Make sure your code handles the second time." — Electro Engineer',
]

function getNeofetch(element: ElementType): string[] {
  const asciiArt: Record<ElementType, string[]> = {
    fire: [
      '       (  .      )',
      '      )           (',
      '            .  )  .',
      '     (.   )  (   )',
      '   .-\'\'\'\'\'\'\'\'\'\'-.  ',
      '  /  KOMODO     \\ ',
      ' |   LIZARD      |',
      '  \\             / ',
      '   \'-..........\'  ',
    ],
    water: [
      '        ___       ',
      '    .-\'     \'-.   ',
      '   /  GREAT    \\  ',
      '  |   BLUE      | ',
      '  |    SHARK    |  ',
      '   \\           /  ',
      '    \'-.     .-\'   ',
      '   ~~~~\\~/~~~~    ',
      '    ~~~~~~~~~     ',
    ],
    lightning: [
      '      /\\          ',
      '     /  \\    /\\   ',
      '    / BENGAL \\    ',
      '   /  TIGER   \\  ',
      '  /     ||     \\ ',
      ' /______||______\\',
      '    \\  ||||  /   ',
      '     \\ |||| /    ',
      '      \\||||/     ',
    ],
    wind: [
      '     ___/\\_/\\     ',
      '    / MARTIAL \\   ',
      '   /   EAGLE   \\  ',
      '  |  ^      ^   | ',
      '  |    (  )     |  ',
      '   \\   \\--/   /  ',
      '    \\  ////  /   ',
      '     \\///////    ',
      '      ~~~~~~     ',
    ],
    void: [
      '      .::::.      ',
      '    .::::::::.    ',
      '   ::: PRIMAL ::: ',
      '  :::: DRAGON ::::',
      '  :::  /\\/\\/\\  :::',
      '  ::: < @  @ > :::',
      '   :::  \\~~/ :::  ',
      '    \'::::::::::\'  ',
      '      \'::::\'      ',
    ],
  }

  const art = asciiArt[element]
  const el = ELEMENTS[element]

  return [
    '',
    ...art.map((line, i) => {
      const info = [
        `OS: null v1.0.0`,
        `Shell: elemental-bash`,
        `Theme: ${el.name}`,
        `Nation: ${el.nation}`,
        `Spirit: ${el.animal}`,
        `Weapon: ${el.weapon}`,
        `Disaster: ${el.disaster}`,
        `Uptime: since the dawn of creation`,
        `Memory: infinite (void-backed)`,
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
          '  lore [el]     Explore the elemental world',
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
          '  Currently using: TypeScript, React, Node.js',
          '  Side hobby: worldbuilding a fantasy universe',
          '',
        ],
      }

    case 'projects':
      return {
        lines: [
          '',
          '  Forces of Nature:',
          '',
          ...PROJECTS.map(
            (p) => `  🌍 ${p.title.padEnd(12)} ${p.subtitle}`
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
          '  Skills across the four forces:',
          '',
          ...PROJECTS.flatMap((p) => [
            `  ${ELEMENTS[p.element].name.padEnd(10)} ${p.tech.join(', ')}`,
          ]),
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
            `  Current theme: ${ELEMENTS[currentElement].name} (${ELEMENTS[currentElement].nation})`,
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
          `  Welcome to the ${ELEMENTS[target].nation}.`,
          `  Spirit Animal: ${ELEMENTS[target].animal}`,
          '',
        ],
        action: { type: 'setElement', value: target },
      }
    }

    case 'lore': {
      const target = args[0] as ElementType | undefined
      if (target && ELEMENT_ORDER.includes(target)) {
        const el = ELEMENTS[target]
        return {
          lines: [
            '',
            `  === ${el.name.toUpperCase()} — ${el.nation} ===`,
            '',
            `  Spirit Animal:    ${el.animal}`,
            `  Sacred Weapon:    ${el.weapon}`,
            `  Sacred Item:      ${el.sacredItem}`,
            `  Natural Disaster: ${el.disaster}`,
            `  Ultimate Attack:  ${el.disasterAttack}`,
            `  Food Prep:        ${el.foodPrep}`,
            '',
            `  ${el.description}`,
            '',
          ],
        }
      }
      return {
        lines: [
          '',
          '  The Six Elemental Nations:',
          '',
          ...ELEMENT_ORDER.map(
            (el) => `  [${el.padEnd(9)}] ${ELEMENTS[el].nation.padEnd(22)} — ${ELEMENTS[el].animal}`
          ),
          '',
          '  Type "lore <element>" for details. e.g. "lore void"',
          '',
        ],
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
        lines: [
          '',
          '  Permission denied. You cannot destroy what the void has already claimed.',
          '',
        ],
        color: '#a0a0a0',
      }

    case 'hack':
      return {
        lines: [
          '',
          '  Initiating hack sequence...',
          '  Bypassing elemental firewall...',
          '  Accessing sacred weapon database...',
          '  ...',
          '  Just kidding. Have a cookie instead. 🍪',
          '',
        ],
      }

    case 'whoami':
      return {
        lines: [
          '',
          '  visitor — but perhaps you are destined for more.',
          '  Try "lore" to discover your nation.',
          '',
        ],
      }

    case 'ls':
      return {
        lines: [
          '',
          '  fire/  water/  lightning/  wind/  void/  README.md',
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
            '  A portfolio forged in the elements.',
            '  By Rich, Software Engineer.',
            '',
            '  In the beginning, six elemental bodies governed the planet',
            '  and gave life to humans. Many were normal, but others',
            '  were blessed with elemental powers...',
            '',
          ],
        }
      }
      return { lines: ['', `  cat: ${args[0] || '???'}: No such file in this realm.`, ''] }

    case 'pwd':
      return { lines: ['', '  /home/rich/null', ''] }

    case 'cd':
      return { lines: ['', '  There is no escape. You are exactly where you need to be.', ''] }

    case 'exit':
      return { lines: ['', '  The void has no exit. Only deeper levels.', ''] }

    case 'hello':
    case 'hi':
      return { lines: ['', '  Hello, traveler. Welcome to the realm of null.', ''] }

    case 'rich':
      return {
        lines: [
          '',
          '  You have summoned the Chosen One.',
          '  He nods approvingly.',
          '',
        ],
      }

    case 'emilia':
      return {
        lines: [
          '',
          '  Silver hair in the moonlight...',
          '  A name carried through the four nations.',
          '  Some say she still travels the trade routes.',
          '',
        ],
        color: '#c0c0c0',
      }

    case 'quad':
      return {
        lines: [
          '',
          '  A white beard. Four limbs forged from elder animals.',
          '  The only human to master all four elements.',
          '  The Emperor.',
          '  ...and the ultimate enemy.',
          '',
        ],
        color: '#ff4500',
      }

    case 'rock':
      return {
        lines: [
          '',
          '  The Immovable Object.',
          '  A nomadic Earth merchant who walked the Avalanche Route.',
          '  His skin was as tough as steel, and his heart even tougher.',
          '  "Follow the beasts within."',
          '',
        ],
        color: '#daa520',
      }

    case 'dark':
      return {
        lines: [
          '',
          '  The Unstoppable Force.',
          '  A mysterious void hunter who appeared as quietly as he vanished.',
          '  He sealed a weapon within the Chosen, then disappeared into the black.',
          '',
        ],
        color: '#707070',
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
