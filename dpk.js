const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

/*
It was a bit unclear where I should put my explanation, just in case I'll leave it here.
1) First of all, I'm sure with the simple truth - the less code, the more maintainable and readable it is.
Of course, there are exceptions to this rule, but this is a general observation.
2) I also prefer the flattest structure possible.
3) I used to make refactor slice by slice, which helps me to deeper understand the code around. When some simple stuff
is refactored, you'll see future possibilities to improve the code.
4) I put some utility functions below not to bother the main function, if they are not so big
 */
exports.deterministicPartitionKey = (event) => {
  if (!event) return TRIVIAL_PARTITION_KEY;

  const key = event.partitionKey;
  if (!key) return createHash(JSON.stringify(event));

  const candidate = typeof key === "string" ? key: JSON.stringify(key);
  const isExceedMaxLength = candidate.length > MAX_PARTITION_KEY_LENGTH;

  return isExceedMaxLength ? createHash(candidate) : candidate;

};

const CRYPTO_ALGORITHM = "sha3-512";
const CRYPTO_ENCODING = "hex";
function createHash(data) {
  return crypto.createHash(CRYPTO_ALGORITHM).update(data).digest(CRYPTO_ENCODING);
}