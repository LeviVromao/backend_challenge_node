import { NodeMailProvider } from "../../providers/Implementations/NodeMailProvider"
import { ContactUseCase } from "./ContactUseCase"
import { ContactController } from "./ContactController"

const nodeMaileProvider = new NodeMailProvider()
const contactUseCase = new ContactUseCase(
  nodeMaileProvider
)
const contactController = new ContactController(
    contactUseCase
)

export {
    contactController,
    contactUseCase,
}