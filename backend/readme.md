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
  "animation-id": "some-uuid-abcd-efgh"
}
```

## Get Inidividual Animation API

- `GET /api/animaton/<animation-uuid>`
- response:

```json
{
  "status": "READY",
  "video": "http:///domain.com/api/animaton/uuid"
}
```
