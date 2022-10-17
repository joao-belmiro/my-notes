import { shallowMount, mount } from '@vue/test-utils'
import HeaderNote from '@/components/HeaderNote.vue'
import CardNote from '@/components/CardNote.vue'
import FormEvent from '@/views/FormEvent.vue'

const dataProps = {
  id: 1,
  title: 'Nova nota 123',
  date: '2022-10-16T00:53',
  description: '# Exemplo de Markdown \n > Nota importante \n \n header 1 | header 2\n ---|--- \nrow 1 col 1 | row 1 col 2 \nrow 2 col 1 | row 2 col 2\n\n\n\n> nota editada',
  pinned: false
}

describe('testando Componente HeaderNote.vue', () => {
  it('testando render do componente de header ', () => {
    const msg = 'Nova nota'
    const wrapper = shallowMount(HeaderNote, {
      propsData: { title: 'Nova nota' }
    })
    expect(wrapper.text()).toEqual(msg)
  })

  it('testando render do componente de header com troca de props', async () => {
    const wrapper = shallowMount(HeaderNote, {
      propsData: { title: 'Nova nota' }
    })

    await wrapper.setProps({ title: 'Notas do dia' })
    await wrapper.vm.$nextTick()
    expect(wrapper.vm.title).toEqual('Notas do dia')
  })
})

describe('testando Componente CardNote.vue', () => {
  it('testando render do componente de card', async () => {
    const wrapper = mount(CardNote, {
      propsData: dataProps
    })
    expect(wrapper.vm.id).toEqual(1)
    expect(wrapper.vm.title).toEqual('Nova nota 123')
  })
})
describe('testando Componente FormEvent.vue', () => {
  it('testando input de titulo do formulário', async () => {
    const wrapper = mount(FormEvent, {
      propsData: dataProps
    })
    const inputTitle = wrapper.find('input[name=title]')
    await inputTitle.setValue('Teste input de texto')
    expect(wrapper.vm.$data.title).toEqual('Teste input de texto')
  })

  it('testando input de data do formulário', async () => {
    const wrapper = mount(FormEvent, {
      propsData: dataProps
    })
    const inputDate = wrapper.find('input[name=dateEvent]')
    await inputDate.setValue('2022-10-16T00:53')
    expect(wrapper.vm.$data.creationDate).toEqual('2022-10-16T00:53')
  })

  it('testando input de checkbox do formulário', async () => {
    const wrapper = mount(FormEvent, {
      propsData: dataProps
    })
    const inputPinned = wrapper.find('input[name=pinned]')
    await inputPinned.setChecked()
    expect(wrapper.vm.$data.pinned).toEqual(true)
  })
})
