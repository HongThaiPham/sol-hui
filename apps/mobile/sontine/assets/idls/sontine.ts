/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/sontine.json`.
 */
export type Sontine = {
  address: "GorkwbJYHK36X3nmEu9RY8rgZ9sFnudx9voNQskjiF67";
  metadata: {
    name: "sontine";
    version: "0.1.0";
    spec: "0.1.0";
    description: "Created with Anchor";
  };
  instructions: [
    {
      name: "cancelGroup";
      discriminator: [219, 172, 216, 128, 155, 75, 12, 110];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
      ];
      args: [];
    },
    {
      name: "claimEmergencyRefund";
      discriminator: [93, 43, 46, 219, 83, 211, 152, 172];
      accounts: [
        {
          name: "group";
        },
        {
          name: "memberAccount";
          writable: true;
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "group";
              },
            ];
          };
        },
        {
          name: "mint";
        },
        {
          name: "memberTokenAccount";
          writable: true;
        },
        {
          name: "member";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
        },
      ];
      args: [];
    },
    {
      name: "commitRandomness";
      discriminator: [146, 52, 195, 220, 79, 30, 53, 26];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "round";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "group";
              },
              {
                kind: "arg";
                path: "roundNumber";
              },
            ];
          };
        },
        {
          name: "randomnessAccount";
          docs: ["Switchboard randomness account"];
          writable: true;
        },
        {
          name: "queue";
          docs: ["Switchboard queue account"];
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "roundNumber";
          type: "u8";
        },
      ];
    },
    {
      name: "contribute";
      discriminator: [82, 33, 68, 131, 32, 0, 205, 95];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "memberAccount";
          writable: true;
        },
        {
          name: "round";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "group";
              },
              {
                kind: "arg";
                path: "roundNumber";
              },
            ];
          };
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "group";
              },
            ];
          };
        },
        {
          name: "memberTokenAccount";
          writable: true;
        },
        {
          name: "mint";
        },
        {
          name: "member";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "roundNumber";
          type: "u8";
        },
        {
          name: "amount";
          type: "u64";
        },
      ];
    },
    {
      name: "createGroup";
      discriminator: [79, 60, 158, 134, 61, 199, 56, 248];
      accounts: [
        {
          name: "group";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [103, 114, 111, 117, 112];
              },
              {
                kind: "account";
                path: "admin";
              },
              {
                kind: "arg";
                path: "groupId";
              },
            ];
          };
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "group";
              },
            ];
          };
        },
        {
          name: "mint";
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "tokenProgram";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "groupId";
          type: "u64";
        },
        {
          name: "selectionMethod";
          type: {
            defined: {
              name: "selectionMethod";
            };
          };
        },
        {
          name: "maxMembers";
          type: "u8";
        },
        {
          name: "contributionAmount";
          type: "u64";
        },
        {
          name: "cycleDuration";
          type: {
            defined: {
              name: "cycleDuration";
            };
          };
        },
        {
          name: "minMembersToStart";
          type: {
            option: "u8";
          };
        },
        {
          name: "auctionConfig";
          type: {
            option: {
              defined: {
                name: "auctionConfig";
              };
            };
          };
        },
      ];
    },
    {
      name: "distributeFunds";
      discriminator: [124, 82, 187, 45, 224, 209, 31, 156];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "memberAccount";
          writable: true;
        },
        {
          name: "round";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "group";
              },
              {
                kind: "arg";
                path: "roundNumber";
              },
            ];
          };
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "group";
              },
            ];
          };
        },
        {
          name: "mint";
        },
        {
          name: "memberTokenAccount";
          writable: true;
        },
        {
          name: "selectedMember";
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "roundNumber";
          type: "u8";
        },
      ];
    },
    {
      name: "distributeInterest";
      discriminator: [161, 80, 239, 247, 115, 254, 122, 80];
      accounts: [
        {
          name: "group";
        },
        {
          name: "memberAccount";
          writable: true;
        },
        {
          name: "round";
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "group";
              },
              {
                kind: "arg";
                path: "roundNumber";
              },
            ];
          };
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "group";
              },
            ];
          };
        },
        {
          name: "memberTokenAccount";
          writable: true;
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
          address: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
        },
      ];
      args: [
        {
          name: "roundNumber";
          type: "u8";
        },
        {
          name: "remainingMembers";
          type: "u8";
        },
      ];
    },
    {
      name: "emergencyPause";
      discriminator: [21, 143, 27, 142, 200, 181, 210, 255];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
      ];
      args: [];
    },
    {
      name: "emergencyResume";
      discriminator: [0, 243, 48, 185, 6, 73, 190, 83];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
      ];
      args: [];
    },
    {
      name: "finalizeRound";
      discriminator: [239, 160, 254, 11, 254, 144, 53, 148];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "round";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "group";
              },
              {
                kind: "arg";
                path: "roundNumber";
              },
            ];
          };
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
      ];
      args: [
        {
          name: "roundNumber";
          type: "u8";
        },
      ];
    },
    {
      name: "getAuctionStatistics";
      discriminator: [135, 85, 235, 166, 72, 205, 128, 95];
      accounts: [
        {
          name: "auctionRound";
        },
      ];
      args: [];
      returns: {
        defined: {
          name: "auctionStatistics";
        };
      };
    },
    {
      name: "getGroupStatistics";
      discriminator: [97, 215, 137, 171, 153, 47, 171, 76];
      accounts: [
        {
          name: "group";
        },
      ];
      args: [];
      returns: {
        defined: {
          name: "groupStatistics";
        };
      };
    },
    {
      name: "getMemberStatistics";
      discriminator: [65, 132, 61, 98, 78, 20, 135, 206];
      accounts: [
        {
          name: "memberAccount";
        },
      ];
      args: [];
      returns: {
        defined: {
          name: "memberStatistics";
        };
      };
    },
    {
      name: "getRoundStatistics";
      discriminator: [81, 92, 171, 144, 144, 88, 192, 248];
      accounts: [
        {
          name: "round";
        },
      ];
      args: [];
      returns: {
        defined: {
          name: "roundStatistics";
        };
      };
    },
    {
      name: "initialize";
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237];
      accounts: [];
      args: [];
    },
    {
      name: "initiateEmergencyRefund";
      discriminator: [239, 254, 190, 249, 140, 67, 187, 37];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
      ];
      args: [];
    },
    {
      name: "joinGroup";
      discriminator: [121, 56, 199, 19, 250, 70, 44, 184];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "memberAccount";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [109, 101, 109, 98, 101, 114];
              },
              {
                kind: "account";
                path: "group";
              },
              {
                kind: "account";
                path: "member";
              },
            ];
          };
        },
        {
          name: "member";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "leaveGroup";
      discriminator: [10, 4, 125, 28, 46, 23, 233, 29];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "memberAccount";
          writable: true;
        },
        {
          name: "member";
          writable: true;
          signer: true;
        },
      ];
      args: [];
    },
    {
      name: "placeBid";
      discriminator: [238, 77, 148, 91, 200, 151, 92, 146];
      accounts: [
        {
          name: "group";
        },
        {
          name: "memberAccount";
          writable: true;
        },
        {
          name: "auctionRound";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 117, 99, 116, 105, 111, 110];
              },
              {
                kind: "account";
                path: "group";
              },
              {
                kind: "arg";
                path: "roundNumber";
              },
            ];
          };
        },
        {
          name: "member";
          writable: true;
          signer: true;
        },
      ];
      args: [
        {
          name: "roundNumber";
          type: "u8";
        },
        {
          name: "bidAmount";
          type: "u16";
        },
      ];
    },
    {
      name: "processPartialRefund";
      discriminator: [91, 2, 45, 239, 179, 132, 197, 213];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "memberAccount";
          writable: true;
        },
        {
          name: "vault";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [118, 97, 117, 108, 116];
              },
              {
                kind: "account";
                path: "group";
              },
            ];
          };
        },
        {
          name: "mint";
        },
        {
          name: "memberTokenAccount";
          writable: true;
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "tokenProgram";
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
        {
          name: "rent";
          address: "SysvarRent111111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "resetMembersForNewRound";
      discriminator: [144, 99, 246, 42, 240, 170, 182, 215];
      accounts: [
        {
          name: "group";
        },
        {
          name: "memberAccount";
          writable: true;
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
      ];
      args: [];
    },
    {
      name: "selectWinner";
      discriminator: [119, 66, 44, 236, 79, 158, 82, 51];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "round";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "group";
              },
              {
                kind: "arg";
                path: "roundNumber";
              },
            ];
          };
        },
        {
          name: "auctionRound";
          docs: ["Optional auction round account for auction method"];
          writable: true;
          optional: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 117, 99, 116, 105, 111, 110];
              },
              {
                kind: "account";
                path: "group";
              },
              {
                kind: "arg";
                path: "roundNumber";
              },
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
      ];
      args: [
        {
          name: "roundNumber";
          type: "u8";
        },
        {
          name: "eligibleMembers";
          type: {
            vec: "pubkey";
          };
        },
      ];
    },
    {
      name: "settleRandomness";
      discriminator: [209, 111, 84, 239, 14, 4, 26, 251];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "round";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "group";
              },
              {
                kind: "arg";
                path: "roundNumber";
              },
            ];
          };
        },
        {
          name: "randomnessAccount";
          docs: ["Switchboard randomness account"];
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
      ];
      args: [
        {
          name: "roundNumber";
          type: "u8";
        },
        {
          name: "eligibleMembers";
          type: {
            vec: "pubkey";
          };
        },
      ];
    },
    {
      name: "startAuction";
      discriminator: [255, 2, 149, 136, 148, 125, 65, 195];
      accounts: [
        {
          name: "group";
        },
        {
          name: "round";
          writable: true;
        },
        {
          name: "auctionRound";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [97, 117, 99, 116, 105, 111, 110];
              },
              {
                kind: "account";
                path: "group";
              },
              {
                kind: "arg";
                path: "roundNumber";
              },
            ];
          };
        },
        {
          name: "authority";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "roundNumber";
          type: "u8";
        },
      ];
    },
    {
      name: "startGroup";
      discriminator: [247, 125, 134, 7, 156, 15, 173, 1];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "firstRound";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "group";
              },
              {
                kind: "const";
                value: [0];
              },
            ];
          };
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [];
    },
    {
      name: "startRound";
      discriminator: [144, 144, 43, 7, 193, 42, 217, 215];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "round";
          writable: true;
          pda: {
            seeds: [
              {
                kind: "const";
                value: [114, 111, 117, 110, 100];
              },
              {
                kind: "account";
                path: "group";
              },
              {
                kind: "arg";
                path: "roundNumber";
              },
            ];
          };
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
        {
          name: "systemProgram";
          address: "11111111111111111111111111111111";
        },
      ];
      args: [
        {
          name: "roundNumber";
          type: "u8";
        },
      ];
    },
    {
      name: "updateGroupConfig";
      discriminator: [237, 22, 68, 139, 99, 160, 215, 91];
      accounts: [
        {
          name: "group";
          writable: true;
        },
        {
          name: "admin";
          writable: true;
          signer: true;
        },
      ];
      args: [
        {
          name: "newMinMembersToStart";
          type: {
            option: "u8";
          };
        },
        {
          name: "newAuctionConfig";
          type: {
            option: {
              defined: {
                name: "auctionConfig";
              };
            };
          };
        },
      ];
    },
  ];
  accounts: [
    {
      name: "auctionRound";
      discriminator: [193, 35, 83, 13, 200, 67, 45, 96];
    },
    {
      name: "group";
      discriminator: [209, 249, 208, 63, 182, 89, 186, 254];
    },
    {
      name: "member";
      discriminator: [54, 19, 162, 21, 29, 166, 17, 198];
    },
    {
      name: "round";
      discriminator: [87, 127, 165, 51, 73, 78, 116, 174];
    },
  ];
  events: [
    {
      name: "auctionStarted";
      discriminator: [126, 97, 193, 56, 72, 162, 162, 64];
    },
    {
      name: "bidPlaced";
      discriminator: [135, 53, 176, 83, 193, 69, 108, 61];
    },
    {
      name: "contributionMade";
      discriminator: [81, 218, 72, 109, 93, 96, 131, 199];
    },
    {
      name: "emergencyRefundClaimed";
      discriminator: [104, 236, 213, 53, 33, 123, 169, 163];
    },
    {
      name: "emergencyRefundInitiated";
      discriminator: [181, 66, 90, 57, 124, 48, 249, 253];
    },
    {
      name: "fundsDistributed";
      discriminator: [246, 28, 47, 10, 202, 53, 3, 232];
    },
    {
      name: "groupCancelled";
      discriminator: [59, 49, 243, 198, 10, 174, 169, 2];
    },
    {
      name: "groupConfigUpdated";
      discriminator: [147, 232, 195, 160, 131, 40, 138, 52];
    },
    {
      name: "groupCreated";
      discriminator: [132, 94, 184, 198, 77, 165, 13, 26];
    },
    {
      name: "groupPaused";
      discriminator: [201, 42, 147, 163, 162, 140, 175, 191];
    },
    {
      name: "groupResumed";
      discriminator: [153, 78, 122, 141, 40, 93, 191, 227];
    },
    {
      name: "groupStarted";
      discriminator: [22, 160, 223, 146, 57, 205, 202, 221];
    },
    {
      name: "interestDistributed";
      discriminator: [235, 153, 18, 137, 191, 105, 51, 54];
    },
    {
      name: "memberJoined";
      discriminator: [156, 199, 149, 88, 193, 203, 191, 210];
    },
    {
      name: "memberLeft";
      discriminator: [48, 83, 72, 92, 111, 227, 133, 142];
    },
    {
      name: "partialRefundProcessed";
      discriminator: [44, 255, 244, 126, 87, 212, 119, 147];
    },
    {
      name: "randomWinnerSelected";
      discriminator: [44, 75, 107, 162, 14, 231, 14, 158];
    },
    {
      name: "randomnessCommitted";
      discriminator: [125, 150, 46, 71, 102, 251, 253, 108];
    },
    {
      name: "roundFinalized";
      discriminator: [43, 187, 17, 193, 36, 241, 48, 82];
    },
    {
      name: "roundStarted";
      discriminator: [180, 209, 2, 244, 238, 48, 170, 120];
    },
    {
      name: "winnerSelected";
      discriminator: [245, 110, 152, 173, 193, 48, 133, 5];
    },
  ];
  errors: [
    {
      code: 6000;
      name: "unauthorized";
      msg: "Unauthorized access to group";
    },
    {
      code: 6001;
      name: "groupFull";
      msg: "Group is full";
    },
    {
      code: 6002;
      name: "cannotStartGroup";
      msg: "Group cannot be started";
    },
    {
      code: 6003;
      name: "groupNotActive";
      msg: "Group is not active";
    },
    {
      code: 6004;
      name: "groupPaused";
      msg: "Group is paused";
    },
    {
      code: 6005;
      name: "invalidSelectionMethod";
      msg: "Invalid selection method";
    },
    {
      code: 6006;
      name: "groupAlreadyStarted";
      msg: "Group already started";
    },
    {
      code: 6007;
      name: "groupNotFound";
      msg: "Group not found";
    },
    {
      code: 6008;
      name: "memberNotActive";
      msg: "Member not active";
    },
    {
      code: 6009;
      name: "memberAlreadyExists";
      msg: "Member already exists";
    },
    {
      code: 6010;
      name: "memberNotFound";
      msg: "Member not found";
    },
    {
      code: 6011;
      name: "memberAlreadyReceived";
      msg: "Member already received payout";
    },
    {
      code: 6012;
      name: "alreadyContributed";
      msg: "Member already contributed this round";
    },
    {
      code: 6013;
      name: "noEligibleMembers";
      msg: "No eligible members";
    },
    {
      code: 6014;
      name: "roundNotAcceptingContributions";
      msg: "Round not accepting contributions";
    },
    {
      code: 6015;
      name: "invalidRoundStatus";
      msg: "Invalid round status";
    },
    {
      code: 6016;
      name: "roundNotCompleted";
      msg: "Round not completed";
    },
    {
      code: 6017;
      name: "notReadyForSelection";
      msg: "Not ready for selection";
    },
    {
      code: 6018;
      name: "noMemberSelected";
      msg: "No member selected";
    },
    {
      code: 6019;
      name: "roundAlreadyExists";
      msg: "Round already exists";
    },
    {
      code: 6020;
      name: "auctionNotActive";
      msg: "Auction not active";
    },
    {
      code: 6021;
      name: "auctionStillActive";
      msg: "Auction still active";
    },
    {
      code: 6022;
      name: "auctionFinalized";
      msg: "Auction finalized";
    },
    {
      code: 6023;
      name: "bidTooLow";
      msg: "Bid too low";
    },
    {
      code: 6024;
      name: "invalidBidAmount";
      msg: "Invalid bid amount";
    },
    {
      code: 6025;
      name: "invalidContributionAmount";
      msg: "Invalid contribution amount";
    },
    {
      code: 6026;
      name: "insufficientFunds";
      msg: "Insufficient funds";
    },
    {
      code: 6027;
      name: "invalidAmount";
      msg: "Invalid amount";
    },
    {
      code: 6028;
      name: "tooEarly";
      msg: "Too early";
    },
    {
      code: 6029;
      name: "tooLate";
      msg: "Too late";
    },
    {
      code: 6030;
      name: "invalidTiming";
      msg: "Invalid timing";
    },
    {
      code: 6031;
      name: "invalidConfiguration";
      msg: "Invalid configuration";
    },
    {
      code: 6032;
      name: "invalidMaxMembers";
      msg: "Invalid max members";
    },
    {
      code: 6033;
      name: "invalidCycleDuration";
      msg: "Invalid cycle duration";
    },
    {
      code: 6034;
      name: "mathOverflow";
      msg: "Math overflow";
    },
    {
      code: 6035;
      name: "divisionByZero";
      msg: "Division by zero";
    },
    {
      code: 6036;
      name: "invalidState";
      msg: "Invalid state";
    },
    {
      code: 6037;
      name: "operationNotAllowed";
      msg: "Operation not allowed";
    },
    {
      code: 6038;
      name: "accountMismatch";
      msg: "Account mismatch";
    },
    {
      code: 6039;
      name: "invalidAccount";
      msg: "Invalid account";
    },
    {
      code: 6040;
      name: "randomnessAlreadyRequested";
      msg: "Randomness already requested";
    },
    {
      code: 6041;
      name: "randomnessNotCommitted";
      msg: "Randomness not committed";
    },
    {
      code: 6042;
      name: "randomnessNotRevealed";
      msg: "Randomness not revealed";
    },
    {
      code: 6043;
      name: "invalidRandomnessAccount";
      msg: "Invalid randomness account";
    },
    {
      code: 6044;
      name: "invalidRandomnessSlot";
      msg: "Invalid randomness slot";
    },
    {
      code: 6045;
      name: "randomnessAlreadyRevealed";
      msg: "Randomness already revealed";
    },
  ];
  types: [
    {
      name: "auctionBid";
      docs: ["Auction bid information"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "member";
            docs: ["Member who placed the bid"];
            type: "pubkey";
          },
          {
            name: "amount";
            docs: ["Bid amount (interest rate in basis points)"];
            type: "u16";
          },
          {
            name: "timestamp";
            docs: ["Timestamp when bid was placed"];
            type: "i64";
          },
        ];
      };
    },
    {
      name: "auctionConfig";
      docs: ["Configuration for auction-based selection"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "auctionDuration";
            docs: ["Duration of auction phase in seconds"];
            type: "u64";
          },
          {
            name: "minBidIncrement";
            docs: ["Minimum bid increment in basis points"];
            type: "u16";
          },
          {
            name: "maxInterestRate";
            docs: ["Maximum interest rate allowed (basis points)"];
            type: "u16";
          },
        ];
      };
    },
    {
      name: "auctionRound";
      docs: ["Account to track auction state for a specific round"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            docs: ["The group this auction belongs to"];
            type: "pubkey";
          },
          {
            name: "round";
            docs: ["Round number"];
            type: "u8";
          },
          {
            name: "startTime";
            docs: ["Auction start time"];
            type: "i64";
          },
          {
            name: "endTime";
            docs: ["Auction end time"];
            type: "i64";
          },
          {
            name: "highestBid";
            docs: ["Current highest bid"];
            type: {
              option: {
                defined: {
                  name: "auctionBid";
                };
              };
            };
          },
          {
            name: "bids";
            docs: ["All bids placed (for transparency)"];
            type: {
              vec: {
                defined: {
                  name: "auctionBid";
                };
              };
            };
          },
          {
            name: "finalized";
            docs: ["Whether auction is finalized"];
            type: "bool";
          },
          {
            name: "reserved";
            docs: ["Reserved space"];
            type: {
              array: ["u8", 32];
            };
          },
        ];
      };
    },
    {
      name: "auctionStarted";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "auctionRound";
            type: "pubkey";
          },
          {
            name: "roundNumber";
            type: "u8";
          },
          {
            name: "startTime";
            type: "i64";
          },
          {
            name: "endTime";
            type: "i64";
          },
          {
            name: "duration";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "auctionStatistics";
      docs: ["Auction statistics"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "round";
            type: "u8";
          },
          {
            name: "startTime";
            type: "i64";
          },
          {
            name: "endTime";
            type: "i64";
          },
          {
            name: "highestBid";
            type: {
              option: {
                defined: {
                  name: "auctionBid";
                };
              };
            };
          },
          {
            name: "totalBids";
            type: "u8";
          },
          {
            name: "finalized";
            type: "bool";
          },
          {
            name: "isActive";
            type: "bool";
          },
          {
            name: "remainingTime";
            type: "i64";
          },
        ];
      };
    },
    {
      name: "bidPlaced";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "auctionRound";
            type: "pubkey";
          },
          {
            name: "roundNumber";
            type: "u8";
          },
          {
            name: "member";
            type: "pubkey";
          },
          {
            name: "bidAmount";
            type: "u16";
          },
          {
            name: "timestamp";
            type: "i64";
          },
        ];
      };
    },
    {
      name: "contributionMade";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "round";
            type: "pubkey";
          },
          {
            name: "member";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "roundNumber";
            type: "u8";
          },
          {
            name: "totalCollected";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "cycleDuration";
      docs: ["Cycle duration for rounds"];
      type: {
        kind: "enum";
        variants: [
          {
            name: "weekly";
          },
          {
            name: "monthly";
          },
          {
            name: "custom";
            fields: ["u64"];
          },
        ];
      };
    },
    {
      name: "emergencyRefundClaimed";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "member";
            type: "pubkey";
          },
          {
            name: "refundAmount";
            type: "u64";
          },
          {
            name: "timestamp";
            type: "i64";
          },
        ];
      };
    },
    {
      name: "emergencyRefundInitiated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "timestamp";
            type: "i64";
          },
          {
            name: "reason";
            type: "string";
          },
        ];
      };
    },
    {
      name: "fundsDistributed";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "round";
            type: "pubkey";
          },
          {
            name: "roundNumber";
            type: "u8";
          },
          {
            name: "recipient";
            type: "pubkey";
          },
          {
            name: "amount";
            type: "u64";
          },
          {
            name: "interestAmount";
            type: "u64";
          },
          {
            name: "groupCompleted";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "group";
      docs: ["Main group account that holds all group configuration and state"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "admin";
            docs: ["Group admin who can manage the group"];
            type: "pubkey";
          },
          {
            name: "groupId";
            docs: ["Unique identifier for the group"];
            type: "u64";
          },
          {
            name: "selectionMethod";
            docs: ["Selection method for this group"];
            type: {
              defined: {
                name: "selectionMethod";
              };
            };
          },
          {
            name: "status";
            docs: ["Current status of the group"];
            type: {
              defined: {
                name: "groupStatus";
              };
            };
          },
          {
            name: "maxMembers";
            docs: ["Maximum number of members allowed"];
            type: "u8";
          },
          {
            name: "currentMembers";
            docs: ["Current number of members"];
            type: "u8";
          },
          {
            name: "contributionAmount";
            docs: [
              "Amount each member must contribute per round (in lamports)",
            ];
            type: "u64";
          },
          {
            name: "cycleDuration";
            docs: ["Duration of each round"];
            type: {
              defined: {
                name: "cycleDuration";
              };
            };
          },
          {
            name: "createdAt";
            docs: ["Timestamp when the group was created"];
            type: "i64";
          },
          {
            name: "startedAt";
            docs: ["Timestamp when the group started (first round)"];
            type: {
              option: "i64";
            };
          },
          {
            name: "currentRound";
            docs: ["Current round number (0-indexed)"];
            type: "u8";
          },
          {
            name: "totalRounds";
            docs: ["Total number of rounds (equals max_members)"];
            type: "u8";
          },
          {
            name: "vault";
            docs: ["Vault account that holds the group's funds"];
            type: "pubkey";
          },
          {
            name: "vaultBump";
            docs: ["Vault bump for PDA derivation"];
            type: "u8";
          },
          {
            name: "fixedOrder";
            docs: [
              "For fixed order selection: list of member pubkeys in order",
            ];
            type: {
              vec: "pubkey";
            };
          },
          {
            name: "isPaused";
            docs: ["Emergency pause flag"];
            type: "bool";
          },
          {
            name: "minMembersToStart";
            docs: ["Minimum members required to start (default: max_members)"];
            type: "u8";
          },
          {
            name: "auctionConfig";
            docs: ["Configuration for auction method"];
            type: {
              option: {
                defined: {
                  name: "auctionConfig";
                };
              };
            };
          },
          {
            name: "totalCollected";
            docs: ["Total amount collected so far"];
            type: "u64";
          },
          {
            name: "totalDistributed";
            docs: ["Total amount distributed so far"];
            type: "u64";
          },
          {
            name: "reserved";
            docs: ["Reserved space for future upgrades"];
            type: {
              array: ["u8", 64];
            };
          },
        ];
      };
    },
    {
      name: "groupCancelled";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "timestamp";
            type: "i64";
          },
        ];
      };
    },
    {
      name: "groupConfigUpdated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "timestamp";
            type: "i64";
          },
        ];
      };
    },
    {
      name: "groupCreated";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "groupId";
            type: "u64";
          },
          {
            name: "selectionMethod";
            type: {
              defined: {
                name: "selectionMethod";
              };
            };
          },
          {
            name: "maxMembers";
            type: "u8";
          },
          {
            name: "contributionAmount";
            type: "u64";
          },
          {
            name: "cycleDuration";
            type: {
              defined: {
                name: "cycleDuration";
              };
            };
          },
        ];
      };
    },
    {
      name: "groupPaused";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "timestamp";
            type: "i64";
          },
        ];
      };
    },
    {
      name: "groupResumed";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "timestamp";
            type: "i64";
          },
        ];
      };
    },
    {
      name: "groupStarted";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "memberCount";
            type: "u8";
          },
          {
            name: "firstRound";
            type: "pubkey";
          },
          {
            name: "targetAmount";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "groupStatistics";
      docs: ["Comprehensive group statistics"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "groupId";
            type: "u64";
          },
          {
            name: "admin";
            type: "pubkey";
          },
          {
            name: "selectionMethod";
            type: {
              defined: {
                name: "selectionMethod";
              };
            };
          },
          {
            name: "status";
            type: {
              defined: {
                name: "groupStatus";
              };
            };
          },
          {
            name: "maxMembers";
            type: "u8";
          },
          {
            name: "currentMembers";
            type: "u8";
          },
          {
            name: "minMembersToStart";
            type: "u8";
          },
          {
            name: "contributionAmount";
            type: "u64";
          },
          {
            name: "cycleDuration";
            type: {
              defined: {
                name: "cycleDuration";
              };
            };
          },
          {
            name: "createdAt";
            type: "i64";
          },
          {
            name: "startedAt";
            type: {
              option: "i64";
            };
          },
          {
            name: "currentRound";
            type: "u8";
          },
          {
            name: "totalRounds";
            type: "u8";
          },
          {
            name: "totalCollected";
            type: "u64";
          },
          {
            name: "totalDistributed";
            type: "u64";
          },
          {
            name: "isPaused";
            type: "bool";
          },
          {
            name: "vault";
            type: "pubkey";
          },
          {
            name: "fixedOrder";
            type: {
              vec: "pubkey";
            };
          },
          {
            name: "auctionConfig";
            type: {
              option: {
                defined: {
                  name: "auctionConfig";
                };
              };
            };
          },
        ];
      };
    },
    {
      name: "groupStatus";
      docs: ["Group status"];
      type: {
        kind: "enum";
        variants: [
          {
            name: "forming";
          },
          {
            name: "active";
          },
          {
            name: "paused";
          },
          {
            name: "completed";
          },
          {
            name: "cancelled";
          },
        ];
      };
    },
    {
      name: "interestDistributed";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "round";
            type: "pubkey";
          },
          {
            name: "roundNumber";
            type: "u8";
          },
          {
            name: "member";
            type: "pubkey";
          },
          {
            name: "interestAmount";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "member";
      docs: [
        "Member account that tracks individual member state within a group",
      ];
      type: {
        kind: "struct";
        fields: [
          {
            name: "member";
            docs: ["The member's wallet address"];
            type: "pubkey";
          },
          {
            name: "group";
            docs: ["The group this member belongs to"];
            type: "pubkey";
          },
          {
            name: "status";
            docs: ["Member's status in the group"];
            type: {
              defined: {
                name: "memberStatus";
              };
            };
          },
          {
            name: "joinedAt";
            docs: ["When the member joined the group"];
            type: "i64";
          },
          {
            name: "receivedRound";
            docs: ["Round number when member received payout (if any)"];
            type: {
              option: "u8";
            };
          },
          {
            name: "amountReceived";
            docs: ["Amount received by this member"];
            type: "u64";
          },
          {
            name: "totalContributed";
            docs: ["Total amount contributed by this member"];
            type: "u64";
          },
          {
            name: "roundsContributed";
            docs: ["Number of rounds this member has contributed to"];
            type: "u8";
          },
          {
            name: "currentBid";
            docs: [
              "For auction method: member's current bid (interest rate in basis points)",
            ];
            type: {
              option: "u16";
            };
          },
          {
            name: "lastBidTime";
            docs: ["For auction method: timestamp of last bid"];
            type: {
              option: "i64";
            };
          },
          {
            name: "fixedOrderPosition";
            docs: ["Member's position in fixed order (if applicable)"];
            type: {
              option: "u8";
            };
          },
          {
            name: "contributedCurrentRound";
            docs: ["Whether member has contributed to current round"];
            type: "bool";
          },
          {
            name: "reserved";
            docs: ["Reserved space for future upgrades"];
            type: {
              array: ["u8", 32];
            };
          },
        ];
      };
    },
    {
      name: "memberJoined";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "member";
            type: "pubkey";
          },
          {
            name: "memberCount";
            type: "u8";
          },
          {
            name: "fixedOrderPosition";
            type: {
              option: "u8";
            };
          },
        ];
      };
    },
    {
      name: "memberLeft";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "member";
            type: "pubkey";
          },
          {
            name: "remainingMembers";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "memberStatistics";
      docs: ["Member statistics"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "member";
            type: "pubkey";
          },
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "status";
            type: {
              defined: {
                name: "memberStatus";
              };
            };
          },
          {
            name: "joinedAt";
            type: "i64";
          },
          {
            name: "receivedRound";
            type: {
              option: "u8";
            };
          },
          {
            name: "amountReceived";
            type: "u64";
          },
          {
            name: "totalContributed";
            type: "u64";
          },
          {
            name: "roundsContributed";
            type: "u8";
          },
          {
            name: "currentBid";
            type: {
              option: "u16";
            };
          },
          {
            name: "lastBidTime";
            type: {
              option: "i64";
            };
          },
          {
            name: "fixedOrderPosition";
            type: {
              option: "u8";
            };
          },
          {
            name: "contributedCurrentRound";
            type: "bool";
          },
        ];
      };
    },
    {
      name: "memberStatus";
      docs: ["Member status within a group"];
      type: {
        kind: "enum";
        variants: [
          {
            name: "active";
          },
          {
            name: "received";
          },
          {
            name: "left";
          },
        ];
      };
    },
    {
      name: "partialRefundProcessed";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "member";
            type: "pubkey";
          },
          {
            name: "refundAmount";
            type: "u64";
          },
          {
            name: "timestamp";
            type: "i64";
          },
        ];
      };
    },
    {
      name: "randomWinnerSelected";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "round";
            type: "pubkey";
          },
          {
            name: "roundNumber";
            type: "u8";
          },
          {
            name: "selectedMember";
            type: "pubkey";
          },
          {
            name: "selectionMethod";
            type: {
              defined: {
                name: "selectionMethod";
              };
            };
          },
          {
            name: "interestRate";
            type: {
              option: "u16";
            };
          },
          {
            name: "randomValue";
            type: {
              option: {
                array: ["u8", 32];
              };
            };
          },
        ];
      };
    },
    {
      name: "randomnessCommitted";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "round";
            type: "pubkey";
          },
          {
            name: "roundNumber";
            type: "u8";
          },
          {
            name: "randomnessAccount";
            type: "pubkey";
          },
          {
            name: "committedSlot";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "randomnessStatus";
      docs: ["Status of Switchboard randomness request"];
      type: {
        kind: "enum";
        variants: [
          {
            name: "notRequested";
          },
          {
            name: "committed";
          },
          {
            name: "revealed";
          },
          {
            name: "failed";
          },
        ];
      };
    },
    {
      name: "round";
      docs: ["Round account that tracks the state of each funding round"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            docs: ["The group this round belongs to"];
            type: "pubkey";
          },
          {
            name: "roundNumber";
            docs: ["Round number (0-indexed)"];
            type: "u8";
          },
          {
            name: "status";
            docs: ["Current status of the round"];
            type: {
              defined: {
                name: "roundStatus";
              };
            };
          },
          {
            name: "startTime";
            docs: ["When the round started"];
            type: "i64";
          },
          {
            name: "endTime";
            docs: ["When the round should end"];
            type: "i64";
          },
          {
            name: "targetAmount";
            docs: ["Target amount to collect this round"];
            type: "u64";
          },
          {
            name: "collectedAmount";
            docs: ["Amount collected so far"];
            type: "u64";
          },
          {
            name: "contributorsCount";
            docs: ["Number of members who have contributed"];
            type: "u8";
          },
          {
            name: "expectedContributors";
            docs: ["Expected number of contributors"];
            type: "u8";
          },
          {
            name: "selectedMember";
            docs: ["Member selected to receive funds this round"];
            type: {
              option: "pubkey";
            };
          },
          {
            name: "distributedAmount";
            docs: ["Amount distributed to selected member"];
            type: "u64";
          },
          {
            name: "interestRate";
            docs: [
              "Interest rate for this round (basis points) - for auction method",
            ];
            type: {
              option: "u16";
            };
          },
          {
            name: "interestAmount";
            docs: ["Interest amount to be distributed to other members"];
            type: "u64";
          },
          {
            name: "randomSeed";
            docs: ["Random seed used for selection (for random method)"];
            type: {
              option: {
                array: ["u8", 32];
              };
            };
          },
          {
            name: "randomnessAccount";
            docs: ["Switchboard randomness account for VRF"];
            type: {
              option: "pubkey";
            };
          },
          {
            name: "randomnessStatus";
            docs: ["Randomness status for tracking VRF lifecycle"];
            type: {
              defined: {
                name: "randomnessStatus";
              };
            };
          },
          {
            name: "committedSlot";
            docs: ["Slot when randomness was committed"];
            type: {
              option: "u64";
            };
          },
          {
            name: "contributors";
            docs: ["List of members who contributed this round"];
            type: {
              vec: "pubkey";
            };
          },
          {
            name: "finalized";
            docs: ["Whether round is finalized"];
            type: "bool";
          },
          {
            name: "reserved";
            docs: ["Reserved space for future upgrades"];
            type: {
              array: ["u8", 32];
            };
          },
        ];
      };
    },
    {
      name: "roundFinalized";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "round";
            type: "pubkey";
          },
          {
            name: "roundNumber";
            type: "u8";
          },
          {
            name: "groupCompleted";
            type: "bool";
          },
          {
            name: "totalCollected";
            type: "u64";
          },
          {
            name: "totalDistributed";
            type: "u64";
          },
        ];
      };
    },
    {
      name: "roundStarted";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "round";
            type: "pubkey";
          },
          {
            name: "roundNumber";
            type: "u8";
          },
          {
            name: "targetAmount";
            type: "u64";
          },
          {
            name: "expectedContributors";
            type: "u8";
          },
          {
            name: "startTime";
            type: "i64";
          },
          {
            name: "endTime";
            type: "i64";
          },
        ];
      };
    },
    {
      name: "roundStatistics";
      docs: ["Round statistics with additional computed fields"];
      type: {
        kind: "struct";
        fields: [
          {
            name: "roundNumber";
            type: "u8";
          },
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "status";
            type: {
              defined: {
                name: "roundStatus";
              };
            };
          },
          {
            name: "startTime";
            type: "i64";
          },
          {
            name: "endTime";
            type: "i64";
          },
          {
            name: "targetAmount";
            type: "u64";
          },
          {
            name: "collectedAmount";
            type: "u64";
          },
          {
            name: "contributorsCount";
            type: "u8";
          },
          {
            name: "expectedContributors";
            type: "u8";
          },
          {
            name: "selectedMember";
            type: {
              option: "pubkey";
            };
          },
          {
            name: "distributedAmount";
            type: "u64";
          },
          {
            name: "interestRate";
            type: {
              option: "u16";
            };
          },
          {
            name: "interestAmount";
            type: "u64";
          },
          {
            name: "randomSeed";
            type: {
              option: {
                array: ["u8", 32];
              };
            };
          },
          {
            name: "contributors";
            type: {
              vec: "pubkey";
            };
          },
          {
            name: "finalized";
            type: "bool";
          },
          {
            name: "remainingTime";
            type: "i64";
          },
          {
            name: "completionPercentage";
            type: "u8";
          },
        ];
      };
    },
    {
      name: "roundStatus";
      docs: ["Round status"];
      type: {
        kind: "enum";
        variants: [
          {
            name: "pending";
          },
          {
            name: "contributing";
          },
          {
            name: "selecting";
          },
          {
            name: "completed";
          },
        ];
      };
    },
    {
      name: "selectionMethod";
      docs: ["Selection method for determining who receives funds each round"];
      type: {
        kind: "enum";
        variants: [
          {
            name: "auction";
          },
          {
            name: "random";
          },
          {
            name: "fixedOrder";
          },
        ];
      };
    },
    {
      name: "winnerSelected";
      type: {
        kind: "struct";
        fields: [
          {
            name: "group";
            type: "pubkey";
          },
          {
            name: "round";
            type: "pubkey";
          },
          {
            name: "roundNumber";
            type: "u8";
          },
          {
            name: "selectedMember";
            type: "pubkey";
          },
          {
            name: "selectionMethod";
            type: {
              defined: {
                name: "selectionMethod";
              };
            };
          },
          {
            name: "interestRate";
            type: {
              option: "u16";
            };
          },
        ];
      };
    },
  ];
};
