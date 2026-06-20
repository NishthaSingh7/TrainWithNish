// Hit zones as % of the painted body (0–100). Each muscle uses sides: left, right, and/or center.
// Calibrate with "Calibrate positions" — drag each Left/Right marker separately.

export const muscleRegions = {
  front: {
    neck: {
      label: 'Neck',
      scientific: 'Neck flexors',
      tip: 'Supports posture; often trained indirectly with rows and shrugs.',
      sides: {
        center: {
          polygon: [
            [44, 6],
            [56, 6],
            [57, 12],
            [43, 12],
          ],
        },
      },
    },
    chest: {
      label: 'Chest',
      scientific: 'Pectoralis major',
      tip: 'Key for pushing moves: bench press, push-ups, chest fly.',
      sides: {
        left: {
          polygon: [
            [38, 16],
            [48, 16],
            [50, 28],
            [48, 32],
            [38, 28],
          ],
        },
        right: {
          polygon: [
            [52, 16],
            [62, 16],
            [60, 28],
            [58, 32],
            [50, 28],
          ],
        },
      },
    },
    shoulders: {
      label: 'Shoulders',
      scientific: 'Deltoids',
      tip: 'Train with overhead press, lateral raises, and face pulls.',
      sides: {
        left: {
          polygon: [
            [32, 14],
            [38, 12],
            [42, 18],
            [36, 22],
          ],
        },
        right: {
          polygon: [
            [58, 12],
            [64, 14],
            [60, 22],
            [54, 18],
          ],
        },
      },
    },
    biceps: {
      label: 'Biceps',
      scientific: 'Biceps brachii',
      tip: 'Built with curls, chin-ups, and rowing variations.',
      sides: {
        left: {
          polygon: [
            [26, 22],
            [32, 20],
            [34, 32],
            [28, 36],
            [22, 32],
          ],
        },
        right: {
          polygon: [
            [66, 20],
            [72, 22],
            [76, 32],
            [70, 36],
            [64, 32],
          ],
        },
      },
    },
    forearms: {
      label: 'Forearms',
      scientific: 'Forearm flexors / extensors',
      tip: 'Important for grip strength on deadlifts and pull-ups.',
      sides: {
        left: {
          polygon: [
            [22, 36],
            [30, 36],
            [28, 46],
            [20, 44],
          ],
        },
        right: {
          polygon: [
            [70, 36],
            [78, 36],
            [80, 44],
            [72, 46],
          ],
        },
      },
    },
    abs: {
      label: 'Abs',
      scientific: 'Rectus abdominis',
      tip: 'Core stability for squats, planks, and bracing under load.',
      sides: {
        left: {
          polygon: [
            [42, 30],
            [50, 30],
            [50, 44],
            [41, 44],
          ],
        },
        right: {
          polygon: [
            [50, 30],
            [58, 30],
            [59, 44],
            [50, 44],
          ],
        },
      },
    },
    obliques: {
      label: 'Obliques',
      scientific: 'External obliques',
      tip: 'Supports rotation and anti-rotation in lifts.',
      sides: {
        left: {
          polygon: [
            [36, 36],
            [42, 32],
            [45, 42],
            [37, 46],
          ],
        },
        right: {
          polygon: [
            [58, 32],
            [64, 36],
            [61, 46],
            [53, 42],
          ],
        },
      },
    },
    quadriceps: {
      label: 'Quadriceps',
      scientific: 'Quads',
      tip: 'Main front-thigh muscles for squats, lunges, and leg press.',
      sides: {
        left: {
          polygon: [
            [40, 48],
            [50, 48],
            [50, 68],
            [38, 68],
          ],
        },
        right: {
          polygon: [
            [50, 48],
            [60, 48],
            [62, 68],
            [50, 68],
          ],
        },
      },
    },
    calves: {
      label: 'Calves',
      scientific: 'Gastrocnemius / soleus',
      tip: 'Train with calf raises for ankle stability and jumping.',
      sides: {
        left: {
          polygon: [
            [44, 74],
            [50, 74],
            [50, 90],
            [43, 90],
          ],
        },
        right: {
          polygon: [
            [50, 74],
            [56, 74],
            [57, 90],
            [50, 90],
          ],
        },
      },
    },
  },
  back: {
    trapezius: {
      label: 'Trapezius',
      scientific: 'Traps',
      tip: 'Upper-back strength for shrugs, rows, and posture.',
      sides: {
        center: {
          polygon: [
            [38, 8],
            [62, 8],
            [66, 18],
            [34, 18],
          ],
        },
      },
    },
    upperBack: {
      label: 'Upper Back',
      scientific: 'Rhomboids',
      tip: 'Helps scapular control in rows and pull-ups.',
      sides: {
        center: {
          polygon: [
            [40, 18],
            [60, 18],
            [62, 28],
            [38, 28],
          ],
        },
      },
    },
    lats: {
      label: 'Lats',
      scientific: 'Latissimus dorsi',
      tip: 'Main pulling muscle for pull-ups, pulldowns, and rows.',
      sides: {
        left: {
          polygon: [
            [30, 24],
            [48, 24],
            [48, 42],
            [28, 42],
          ],
        },
        right: {
          polygon: [
            [52, 24],
            [70, 24],
            [72, 42],
            [52, 42],
          ],
        },
      },
    },
    rearDelts: {
      label: 'Rear Delts',
      scientific: 'Posterior deltoid',
      tip: 'Supports shoulder health with reverse fly and face pulls.',
      sides: {
        left: {
          polygon: [
            [24, 16],
            [32, 14],
            [36, 22],
            [28, 24],
          ],
        },
        right: {
          polygon: [
            [64, 14],
            [72, 16],
            [70, 24],
            [62, 22],
          ],
        },
      },
    },
    triceps: {
      label: 'Triceps',
      scientific: 'Triceps brachii',
      tip: 'Back-of-arm power for pressing and dips.',
      sides: {
        left: {
          polygon: [
            [22, 28],
            [30, 26],
            [32, 40],
            [26, 44],
            [20, 38],
          ],
        },
        right: {
          polygon: [
            [68, 26],
            [76, 28],
            [78, 38],
            [72, 44],
            [66, 40],
          ],
        },
      },
    },
    lowerBack: {
      label: 'Lower Back',
      scientific: 'Erector spinae',
      tip: 'Critical for deadlifts, RDLs, and safe spinal bracing.',
      sides: {
        center: {
          polygon: [
            [43, 30],
            [57, 30],
            [58, 40],
            [42, 40],
          ],
        },
      },
    },
    glutes: {
      label: 'Glutes',
      scientific: 'Gluteus maximus',
      tip: 'Hip drive for squats, hip thrusts, and sprint power.',
      sides: {
        left: {
          polygon: [
            [40, 40],
            [50, 40],
            [50, 52],
            [39, 52],
          ],
        },
        right: {
          polygon: [
            [50, 40],
            [60, 40],
            [61, 52],
            [50, 52],
          ],
        },
      },
    },
    hamstrings: {
      label: 'Hamstrings',
      scientific: 'Hamstrings',
      tip: 'Posterior thigh strength for RDLs and leg curls.',
      sides: {
        left: {
          polygon: [
            [41, 52],
            [50, 52],
            [50, 68],
            [40, 68],
          ],
        },
        right: {
          polygon: [
            [50, 52],
            [59, 52],
            [60, 68],
            [50, 68],
          ],
        },
      },
    },
    calves: {
      label: 'Calves',
      scientific: 'Gastrocnemius / soleus',
      tip: 'Lower-leg strength for balance and explosive steps.',
      sides: {
        left: {
          polygon: [
            [44, 74],
            [50, 74],
            [50, 90],
            [43, 90],
          ],
        },
        right: {
          polygon: [
            [50, 74],
            [56, 74],
            [57, 90],
            [50, 90],
          ],
        },
      },
    },
  },
};

export const muscleRegionList = {
  front: Object.keys(muscleRegions.front),
  back: Object.keys(muscleRegions.back),
};
