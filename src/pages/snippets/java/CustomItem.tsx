import { SnippetDocShell, type SnippetDoc } from "../SnippetDocShell";

const doc: SnippetDoc = {
  slug: `item`,
  head: `Custom`,
  word: `Item`,
  tail: `Snippet.`,
  badge: `Fabric API`,
  tags: [
    { icon: `fa-brands fa-java`, label: `Java` },
    { icon: ``, label: `Minecraft 1.20+` },
  ],
  subtitle: `A complete custom item setup for Fabric mods. Includes the item class with tooltips and right-click action, registration code, and language file entry. Replace \`yourmod\` with your mod ID.`,
  info: [
    { head: `// how to use`, body: `Create the item class, register in ModItems, call registerModItems() from your mod initializer, and add the translation key to en_us.json.` },
    { head: `// requirements`, body: `Fabric API, Minecraft 1.20+, Java 17+. Includes tooltip and use action examples.` },
  ],
  files: [
    { name: `ExampleItem.java`, lang: `java`, code: `package com.yourmod.item;

import net.minecraft.entity.player.PlayerEntity;
import net.minecraft.item.Item;
import net.minecraft.item.ItemStack;
import net.minecraft.item.tooltip.TooltipType;
import net.minecraft.text.Text;
import net.minecraft.util.Hand;
import net.minecraft.util.TypedActionResult;
import net.minecraft.world.World;

import java.util.List;

public class ExampleItem extends Item {

    public ExampleItem(Settings settings) {
        super(settings);
    }

    // Right-click action
    @Override
    public TypedActionResult<ItemStack> use(
            World world, PlayerEntity player, Hand hand) {

        ItemStack stack = player.getStackInHand(hand);

        if (!world.isClient) {
            // Your custom logic here
            player.sendMessage(
                Text.literal("You used an Example Item!"), true
            );
            // Consume one item if not in creative
            if (!player.isCreative()) {
                stack.decrement(1);
            }
        }

        return TypedActionResult.success(stack);
    }

    // Custom tooltip
    @Override
    public void appendTooltip(
            ItemStack stack, TooltipContext context,
            List<Text> tooltip, TooltipType type) {

        tooltip.add(Text.literal("This is an example item.")
            .formatted(net.minecraft.util.Formatting.GRAY));
        tooltip.add(Text.literal("You can add custom logic here.")
            .formatted(net.minecraft.util.Formatting.DARK_PURPLE));
    }
}` },
    { name: `ModItems.java`, lang: `java`, code: `package com.yourmod.item;

import com.yourmod.YourMod;
import net.minecraft.item.Item;
import net.minecraft.registry.Registries;
import net.minecraft.registry.Registry;
import net.minecraft.util.Identifier;

public class ModItems {

    public static final Item EXAMPLE_ITEM = register(
        "example_item",
        new ExampleItem(
            new Item.Settings().maxCount(16)
        )
    );

    private static Item register(String name, Item item) {
        return Registry.register(
            Registries.ITEM,
            Identifier.of(YourMod.MOD_ID, name),
            item
        );
    }

    // Call this from your mod initializer
    public static void registerModItems() {
        YourMod.LOGGER.info("Registering mod items for " + YourMod.MOD_ID);
    }
}` },
    { name: `en_us.json`, lang: `java`, code: `{
  "item.yourmod.example_item": "Example Item",
  "itemGroup.yourmod.main_tab": "Your Mod"
}` },
  ],
  prev: { label: `custom block`, to: `/snippet/mc/block` },
  next: { label: `custom recipe`, to: `/snippet/mc/recipe` },
};

export function CustomItem() {
  return <SnippetDocShell doc={doc} />;
}
