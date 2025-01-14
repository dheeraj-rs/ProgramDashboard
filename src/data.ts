export const programData = [
  {
    "id": "3560de4c-6815-42aa-a27d-a5ab386e2c3d",
    "name": "Tracks 1",
    "startDate": "2025-01-13T10:00",
    "endDate": "2025-01-14T22:04",
    "sections": [
      {
        "id": "450c80e1-7068-4c79-82f4-e8e707559bdb",
        "name": "section 1",
        "type": "program",
        "timeSlot": {
          "start": "10:00",
          "end": "11:00"
        },
        "speaker": "dheeraj",
        "role": "spectial gust",
        "subsections": [
          {
            "id": "subsection-1736787690236",
            "name": "sub section 1 ",
            "timeSlot": {
              "start": "10:00",
              "end": "10:30"
            },
            "speaker": "tecnolagy",
            "role": "speekin",
            "subsections": [
              {
                "id": "subsection-1736787850670",
                "name": "sub sub section 1 ",
                "timeSlot": {
                  "start": "10:00",
                  "end": "10:15"
                },
                "speaker": "woder",
                "role": "manager",
                "subsections": [],
                "mergedFields": {
                  "speaker": false,
                  "role": false,
                  "timeSlot": false
                }
              },
              {
                "id": "subsection-1736787924205",
                "name": "sub sub section 2",
                "timeSlot": {
                  "start": "10:15",
                  "end": "10:30"
                },
                "speaker": "waarker",
                "role": "speech",
                "subsections": [],
                "mergedFields": {
                  "speaker": false,
                  "role": false,
                  "timeSlot": false
                }
              }
            ],
            "mergedFields": {
              "speaker": false,
              "role": false,
              "timeSlot": false
            }
          },
          {
            "id": "subsection-1736787760154",
            "name": "sub section 2",
            "timeSlot": {
              "start": "10:30",
              "end": "11:00"
            },
            "speaker": "drj",
            "role": "gamer",
            "subsections": [],
            "mergedFields": {
              "speaker": false,
              "role": false,
              "timeSlot": false
            }
          }
        ],
        "mergedFields": {
          "speaker": false,
          "role": false,
          "timeSlot": false
        }
      },
      {
        "id": "50961440-ea6b-4ac1-98da-32b1d9f2a445",
        "name": "section 2",
        "type": "program",
        "timeSlot": {
          "start": "11:00",
          "end": "12:00"
        },
        "speaker": "dheeru",
        "role": "develeper",
        "subsections": [
          {
            "id": "subsection-1736788070470",
            "name": "sub section 1",
            "timeSlot": {
              "start": "11:00",
              "end": "12:00"
            },
            "speaker": "seek",
            "role": "docter",
            "subsections": [],
            "mergedFields": {
              "speaker": false,
              "role": false,
              "timeSlot": false
            }
          }
        ],
        "mergedFields": {
          "speaker": false,
          "role": false,
          "timeSlot": false
        }
      }
    ]
  },
  {
    "id": "87da0f26-85cc-490a-ae82-3ea3d1c432c3",
    "name": "Track 2",
    "startDate": "2025-01-14T09:00",
    "endDate": "2025-01-15T17:00",
    "sections": [
      {
        "id": "d977d0d9-3a40-4bf1-acc8-0399d75eadbd",
        "name": "section 1",
        "type": "program",
        "timeSlot": {
          "start": "09:00",
          "end": "17:00"
        },
        "speaker": "Speaker 1",
        "role": "Role 1",
        "subsections": [
          {
            "id": "subsection-1736788178538",
            "name": "Subsection 1",
            "timeSlot": {
              "start": "09:00",
              "end": "12:00"
            },
            "speaker": "Speaker 1",
            "role": "Role 1",
            "subsections": [],
            "mergedFields": {
              "speaker": false,
              "role": false,
              "timeSlot": false
            }
          },
          {
            "id": "subsection-1736788243289",
            "name": "subsection 2",
            "timeSlot": {
              "start": "12:00",
              "end": "17:00"
            },
            "speaker": "Speaker 2",
            "role": "Role 2",
            "subsections": [],
            "mergedFields": {
              "speaker": false,
              "role": false,
              "timeSlot": false
            }
          }
        ],
        "mergedFields": {
          "speaker": false,
          "role": false,
          "timeSlot": false
        }
      }
    ]
  }
] as const;