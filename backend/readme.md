# Backend for Le Kahn Académie

## Create Animation API

`POST /api/animation/`

- request:

```json
{
  "prompt": "Create a manim animation in python of a neural network training it's nodes though backpropagation."
}
```

- response:

```json
{
  "animationId": "some-uuid-abcd-efgh"
}
```

## Get Inidividual Animation API

- `GET /api/animaton/<animationId>`
- response:

```json
{
  "animationId": "some-uuid-abcd-efgh",
  "status": "READY",
  "video": "http:///domain.com/api/animaton/uuid"
}
```
