export function compose<ArgB, RetA, BtoA>(
  a: (_: BtoA) => RetA,
  b: (_: ArgB) => BtoA,
): (_: ArgB) => RetA {
  return (arg: ArgB) => {
    return a(b(arg));
  };
}

export default compose;
