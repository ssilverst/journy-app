import pink from '../assets/backgrounds/pinkBackground.png'
import purple from '../assets/backgrounds/purpleBlueBackground.png'
import orange from '../assets/backgrounds/orangeBackground.png'
import green from '../assets/backgrounds/greenBackground.png'

const prompts = {
    'mood':
    {
        'image': pink,
        'prompts': [
            "How did you feel after today’s meeting?",
            "What has been making you happy recently?",
            "What has not been working for you lately?",
            "What has been bugging you recently?",
            "How are you feeling?",
            "What are you looking forward to?",
            "Write about one success, one challenge, and one thing you’re looking forward to."
        ]
    },
    'productivity':
    {
        'image': orange,
        'prompts': [
            "What was your team able to accomplish today?",
            "Where were you most successful today?",
            "What were your biggest breakthroughs today?",
            "How have you been managing your time lately?",
            "What are your goals your next work session?",
            "How has the team been progressing towards goals?",
            "What is the largest way you contribute to the team?"
        ]
    },
    'communication':
    {
        'image': purple,
        'prompts': [
            "How has the team been communicating?",
            "What can be improved about the team’s communication?",
            "How has the team responded to feedback lately?",
            "How do you prefer to give and receive feedback?",
            "What does successful communication look like for you?",
            "What does good communication for this team look like?"
        ]
    },
    'free':
    {
        'image': green,
        'prompts': ['The space is yours!']
    }
}

export default prompts;