const std = @import("std");

export const x: i32 = 420;

// extern fn printNum(num: i32) void;
extern fn display(str: [*]const u8, len: i32) void;
// fn printRaw(str: [*:)])

fn write(_: void, data: []const u8) error{}!usize {
    display(data.ptr, @intCast(data.len));
    return data.len;
}

const RawOutWriter = std.io.GenericWriter(void, error{}, write);
var rawOutWriter = RawOutWriter{ .context = {} };
const BufOutWriter = std.io.BufferedWriter(1024, RawOutWriter);
var bufOutWriter = BufOutWriter{ .unbuffered_writer = rawOutWriter };
const out = rawOutWriter.writer().any();

fn print(comptime format: []const u8, args: anytype) void {
    return out.print(format, args) catch unreachable;
}

pub fn main() void {
    print("@sizeOf(i8):\t{}\n", .{@sizeOf(i8)});
    print("@sizeOf(i32):\t{}\n", .{@sizeOf(i32)});
    print("@sizeOf(i64):\t{}\n", .{@sizeOf(i64)});
    print("@sizeOf(usize):\t{}\n", .{@sizeOf(usize)});
    // try bufOutWriter.flush();
}

test "simple test" {
    var list = std.ArrayList(i32).init(std.testing.allocator);
    defer list.deinit(); // try commenting this out and see if zig detects the memory leak!
    try list.append(42);
    try std.testing.expectEqual(@as(i32, 42), list.pop());
}
