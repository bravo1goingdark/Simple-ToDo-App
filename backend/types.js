import zod from "zod";

export const createToDo = zod.object({
    title : zod.string(),
    description : zod.string()
});

export const updatedToDo = zod.object({
    _id : zod.string()
});
