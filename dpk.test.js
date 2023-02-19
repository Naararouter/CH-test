const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the crypto hash from 'some string'", () => {
    const someString = 'some string';
    const keyBySomeString = '479cbca322b6f9c4662c42b6d154b2ac69aa94f6eca0d1591b24452ecc7d54073bab53a54b57f82494c7ad584e0e7fba3f8309a6ef8343b129cf993b1f14988a';
    const key = deterministicPartitionKey(someString);
    expect(key).toBe(keyBySomeString);
  });
  it("Returns the crypto hash from number 234", () => {
    const soneNumber = 234;
    const keyBySomeString = '304fb9d86de31df8391e1f95030852aae8bc37e36190a15dd6df26b45aa80bf60b9f656de4af6c2bd651c80f54cde84e13ca5a297ff4de5db8f244b578f49a42';
    const key = deterministicPartitionKey(soneNumber);
    expect(key).toBe(keyBySomeString);
  });
  it("Returns the crypto hash from the event with partitionKey < 256 chars (should return the partition key itself)", () => {
    const event = { partitionKey: '2345'};
    const key = deterministicPartitionKey(event);
    expect(key).toBe(event.partitionKey);
  });
  it("Returns the crypto hash from the event with number partitionKey (should return the partition key itself)", () => {
    const event = { partitionKey: 2345 };
    const key = deterministicPartitionKey(event);
    expect(key).toBe(event.partitionKey.toString());
  });
  it("Returns the crypto hash from the event with partitionKey > 256 chars", () => {
    const event = { partitionKey: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In lacinia varius velit, eu fermentum nisi sagittis eu. Sed rhoncus, nisi id fringilla molestie, ipsum enim consectetur sapien, a luctus dolor mauris ac diam. Fusce hendrerit metus euismod, feugiat risus quis, ullamcorper risus. Vivamus auctor turpis quis est sagittis, eget gravida ipsum pretium. Aliquam ullamcorper, eros vel finibus finibus, odio lectus euismod sapien, et lacinia orci tortor eget purus. Pellentesque vulputate justo nisi, quis hendrerit ipsum varius sed. Donec et ante nec metus luctus ultrices sed vitae lacus. Nulla vel vestibulum neque. Nulla luctus tellus ac est ultricies, eu mollis eros interdum. Sed blandit sapien vel velit iaculis malesuada. Quisque sem ex, euismod sed felis in, ultricies consectetur justo.'};
    const expectedHash = '8f41990eb7ef1fa51d61a0a7c40b7e912320a0ac03c2f9d41955a0dcee11bf4d6d03c7f5d5a05ef1157230b74f3223e746696bb03fb7aed813d2c1ef591de072';
    const key = deterministicPartitionKey(event);
    expect(key).toBe(expectedHash);
  });
  it("Returns the crypto hash from the event with a bit unusual partitionKey like NaN", () => {
    const event = { partitionKey: NaN };
    const expectedHash = '58540d4d440df8c6c6da0d79cfce715bc92953c6cde8be9f749790004ef2d5a7322d0fd5170eac9a37d57ee0cc975cfca068a60b01622529d9e0fd657f71b8e2';
    const key = deterministicPartitionKey(event);
    expect(key).toBe(expectedHash);
  });
});
