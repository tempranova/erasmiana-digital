import { useState, useCallback } from "react";

const ROWS = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{bksp}"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l", "-"],
  ["z", "x", "c", "v", "b", "n", "m", ",", "."],
];

const NUMPAD = [
  ["7", "8", "9"],
  ["4", "5", "6"],
  ["1", "2", "3"],
  ["{num0}"],
];

function shouldCapitalize(value) {
  if (value.length === 0) return true;
  const trimmed = value.trimEnd();
  return trimmed.length === 0 || trimmed.endsWith(".");
}

function Key({ label, onPress, className = "" }) {
  return (
    <button
      onPointerDown={(e) => {
        e.preventDefault();
        onPress();
      }}
      className={`
        flex items-center justify-center
        bg-[#2b2f3a] text-white font-semibold
        rounded-xl select-none cursor-pointer
        active:scale-95 active:brightness-75
        transition-transform duration-75
        ${className}
      `}
    >
      {label}
    </button>
  );
}

export default function KioskKeyboard({ value = "", onChange, send }) {
  const [capsLock, setCapsLock] = useState(false);

  const handleKey = useCallback(
    (key) => {
      if (key === "{bksp}") {
        onChange(value.slice(0, -1));
        return;
      }

      const useUpper = capsLock || shouldCapitalize(value);
      const char = useUpper ? key.toUpperCase() : key;
      const next = value + char;

      // After typing, update caps based on new value
      onChange(next);
    },
    [value, onChange, capsLock]
  );

  const handleNumpad = useCallback(
    (key) => {
      if (key === "{num0}") {
        onChange(value + "0");
        return;
      }
      onChange(value + key);
    },
    [value, onChange]
  );

  const handleExclamation = useCallback(() => {
    onChange(value + "!");
  }, [value, onChange]);

  const handleSpace = useCallback(() => {
    onChange(value + " ");
  }, [value, onChange]);

  const handleQuestion = useCallback(() => {
    onChange(value + "?");
  }, [value, onChange]);

  const displayChar = (k) => {
    const useUpper = capsLock || shouldCapitalize(value);
    return useUpper ? k.toUpperCase() : k;
  };

  return (
    <div className="flex justify-center bg-[#DDEEF5] p-4">
      <div className="flex gap-3 select-none w-fit">
        {/* Main keyboard */}
        <div className="flex flex-col gap-2">
          {/* Alpha rows */}
          {ROWS.map((row, ri) => (
            <div key={ri} className="flex gap-2 justify-center">
              {row.map((key) => {
                if (key === "{bksp}") {
                  return (
                    <Key
                      key="bksp"
                      label={
                        <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white">
                          <path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-3.59 13L16 13.41 13.59 16 12 14.41 14.41 12 12 9.59 13.59 8 16 10.41 18.41 8 20 9.59 17.59 12 20 14.41 18.41 16z" />
                        </svg>
                      }
                      onPress={() => handleKey("{bksp}")}
                      className="h-14 w-16 text-lg"
                    />
                  );
                }
                return (
                  <Key
                    key={key}
                    label={displayChar(key)}
                    onPress={() => handleKey(key)}
                    className="h-14 w-14 text-xl"
                  />
                );
              })}
            </div>
          ))}

          {/* Bottom row: @ spacebar - */}
          <div className="flex gap-2 justify-center">
            <Key
              label=""
              onPress={handleSpace}
              className="h-14 flex-1 max-w-md"
            />
            <Key
              label="!"
              onPress={handleExclamation}
              className="h-14 w-14 text-xl"
            />
            <Key
              label="?"
              onPress={handleQuestion}
              className="h-14 w-14 text-xl"
            />
          </div>
        </div>

        {/* Numpad */}
        <div className="ml-16 flex flex-col gap-2">
          {NUMPAD.map((row, ri) => (
            <div key={ri} className="flex gap-2">
              {row.map((key) => {
                if (key === "{num0}") {
                  return (
                    <Key
                      key="num0"
                      label="0"
                      onPress={() => handleNumpad("{num0}")}
                      className="h-14 w-[7.5rem] text-xl"
                    />
                  );
                }
                return (
                  <Key
                    key={key}
                    label={key}
                    onPress={() => handleNumpad(key)}
                    className="h-14 w-14 text-xl"
                  />
                );
              })}
            </div>
          ))}
        </div>
        <div className="ml-16 flex gap-2 items-center justify-center">
          <div onClick={() => send()} className="bg-[#781115] h-full w-48 flex text-center items-center justify-center text-2xl font-semibold text-white p-8 rounded-xl">
            Bericht <br />verzenden
          </div>
        </div>
      </div>
    </div>
  );
}
