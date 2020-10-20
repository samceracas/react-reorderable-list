/* eslint-disable no-undef */
export async function dragAndDrop(source, target) {
  const sourceElement = await page.$(source)
  const targetElement = await page.$(target)
  const targetRect = await targetElement.boundingBox()
  const boundingBox = await sourceElement.boundingBox()

  await page.mouse.move(
    boundingBox.x + boundingBox.width / 2,
    boundingBox.y + boundingBox.height / 2
  )
  await page.mouse.down()
  await page.mouse.move(
    boundingBox.x + boundingBox.width / 2 + 5,
    boundingBox.y + boundingBox.height / 2
  )
  await page.mouse.move(
    targetRect.x + targetRect.width / 2,
    targetRect.y + targetRect.height / 2
  )
  await page.mouse.up()
}
