from kivy.app import App
from kivy.uix.image import Image, AsyncImage


class Main(App):
    def build(self):
        img = AsyncImage(source='https://i1.sndcdn.com/visuals-000936297145-w8wYTr-t1240x260.jpg',
        size_hint=(1, .5),
        pos_hint={'center_x':.5, 'center_y':.5})

        return img


if __name__ == '__main__':
    app = Main()
    app.run()