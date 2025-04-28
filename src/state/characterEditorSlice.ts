import { type CharacterEditorState } from '@/types/character'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: CharacterEditorState = {
  name: '',
  description: '',
  personality: '',
  mes_example: '',
  scenario: '',
  first_mes: '',
  alternate_greetings: [],
  creator: '',
  character_version: '',
  tags: [],
  creator_notes: '',
  system_prompt: '',
  post_history_instructions: '',
  extensions: {}
}

const exampleCharacterObject: CharacterEditorState = {
  name: 'IAssistant',
  description: 'A simple assistant that can help you with your daily tasks.',
  personality: 'polite, kind, helpful, intelligent',
  scenario: '{{user}} is chatting with {{char}}.',
  first_mes: 'Hello, {{user}}! How can I help you today?',
  alternate_greetings: [
    'Hello, {{user}}!',
    "Hi, i'm {{char}}, your personal assistant."
  ],
  mes_example: `<START>
{{char}}: Hello, {{user}}! How can I help you today?
{{user}}: Write a resignation letter for me.
{{char}}: Certainly! Here's a regular expression that can be used to extract domains from email addresses:

\`\`\`regex
@([a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,}
\`\`\`

Explanation of the regex pattern:
- \`@\`: Matches the "@" symbol.
- \`([a-zA-Z0-9-]+\\.)+\`: Matches one or more occurrences of a sequence of alphanumeric characters or hyphens, followed by a dot. This captures the subdomain(s) and domain name(s).
- \`[a-zA-Z]{2,}\`: Matches two or more consecutive alphabetical characters at the end of the domain name. This captures the top-level domain (TLD).

Please note that this regex assumes that the email addresses provided follow standard conventions and do not contain unusual characters or non-standard TLDs.

Remember to adjust the code according to your specific use case and programming language.
`,
  creator: '@SrJuggernaut',
  creator_notes:
    'This is a simple assistant that can help you with your daily tasks, i write it to serve as a template for other characters.',
  character_version: '1.0.0',
  tags: ['assistant', 'template'],
  system_prompt: '',
  post_history_instructions: '',
  extensions: {}
}

const characterEditorSlice = createSlice({
  name: 'characterEditor',
  initialState,
  reducers: {
    setCharacterEditor: (_, action: PayloadAction<CharacterEditorState>) => {
      return action.payload
    },
    updateCharacterEditor: (
      state,
      action: PayloadAction<Partial<CharacterEditorState>>
    ) => {
      return { ...state, ...action.payload }
    },
    clearCharacterEditor: () => {
      return initialState
    },
    loadExampleCharacter: () => {
      return exampleCharacterObject
    }
  }
})

export default characterEditorSlice

export const {
  clearCharacterEditor,
  loadExampleCharacter,
  setCharacterEditor,
  updateCharacterEditor
} = characterEditorSlice.actions
