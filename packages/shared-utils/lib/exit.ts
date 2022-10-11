// export  exit = function(code) {
//     if (exports.exitProcess) {
//       process.exit(code)
//     } else if (code > 0) {
//       throw new Error(`Process exited with code ${code}`)
//     }
//   }

export default function exit(code: number) {
  if (exports.exitProcess) {
    process.exit(code);
  } else if (code > 0) {
    throw new Error(`Process exited with code ${code}`);
  }
}
