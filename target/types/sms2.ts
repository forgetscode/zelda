export type Sms2 = {
  "version": "0.1.0",
  "name": "sms2",
  "instructions": [
    {
      "name": "initializeChat",
      "accounts": [
        {
          "name": "chatInitializer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "chatReceiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "chatIdInitializer",
          "type": "u8"
        },
        {
          "name": "chatIdReceiver",
          "type": "u8"
        },
        {
          "name": "masterId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "initializeMessage",
      "accounts": [
        {
          "name": "message",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "chatInitializer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "chatReceiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "masterId",
          "type": "publicKey"
        },
        {
          "name": "messageId",
          "type": "u8"
        },
        {
          "name": "text",
          "type": "string"
        }
      ]
    },
    {
      "name": "closeChat",
      "accounts": [
        {
          "name": "chatInitializer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "chatReceiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closeMessage",
      "accounts": [
        {
          "name": "message",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "chat",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initializer",
            "type": "publicKey"
          },
          {
            "name": "receiver",
            "type": "publicKey"
          },
          {
            "name": "masterId",
            "type": "publicKey"
          },
          {
            "name": "chatId",
            "type": "u8"
          },
          {
            "name": "otherChatId",
            "type": "u8"
          },
          {
            "name": "messageCount",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "message",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "initializer",
            "type": "publicKey"
          },
          {
            "name": "masterId",
            "type": "publicKey"
          },
          {
            "name": "messageId",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidMessage"
    }
  ]
};

export const IDL: Sms2 = {
  "version": "0.1.0",
  "name": "sms2",
  "instructions": [
    {
      "name": "initializeChat",
      "accounts": [
        {
          "name": "chatInitializer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "chatReceiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "chatIdInitializer",
          "type": "u8"
        },
        {
          "name": "chatIdReceiver",
          "type": "u8"
        },
        {
          "name": "masterId",
          "type": "publicKey"
        }
      ]
    },
    {
      "name": "initializeMessage",
      "accounts": [
        {
          "name": "message",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "chatInitializer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "chatReceiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "masterId",
          "type": "publicKey"
        },
        {
          "name": "messageId",
          "type": "u8"
        },
        {
          "name": "text",
          "type": "string"
        }
      ]
    },
    {
      "name": "closeChat",
      "accounts": [
        {
          "name": "chatInitializer",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "chatReceiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "receiver",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closeMessage",
      "accounts": [
        {
          "name": "message",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "initializer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "chat",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "initializer",
            "type": "publicKey"
          },
          {
            "name": "receiver",
            "type": "publicKey"
          },
          {
            "name": "masterId",
            "type": "publicKey"
          },
          {
            "name": "chatId",
            "type": "u8"
          },
          {
            "name": "otherChatId",
            "type": "u8"
          },
          {
            "name": "messageCount",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "message",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "initializer",
            "type": "publicKey"
          },
          {
            "name": "masterId",
            "type": "publicKey"
          },
          {
            "name": "messageId",
            "type": "u8"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "InvalidMessage"
    }
  ]
};
